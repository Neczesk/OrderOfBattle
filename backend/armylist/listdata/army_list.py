from __future__ import annotations
import datetime
import copy

from .ruleset.list_item import List_Item as ListItem
from .ruleset.ruleset import Ruleset


class ListEntry:
    def __init__(self, li: ListItem, entry_id: int,
                 possible_children: dict[int, ListItem] = {}):
        self.item = li
        self.children: dict[int, ListEntry] = {}
        self.entry_id = entry_id
        self.possible_children = possible_children

    def validate(self) -> bool:
        # If an entry has no children and no possible children, it is automatically valid
        if not (len(self.possible_children) == 0 and len(self.children) == 0):
            # If a child is invalid, the parent is also invalid
            for child in self.children:
                result = self.children[child].validate()
                if not result:
                    return False
            counts: dict[int, int] = {}
            for child in self.children:
                if self.children[child].item.relation_id in counts:
                    counts[self.children[child].item.relation_id] += 1
                else:
                    counts[self.children[child].item.relation_id] = 1
            # If a key in count is not in possible children, it is invalid
            for key in counts:
                if key not in self.possible_children:
                    return False
            # Key in possible children is an item that can be a child of this entry.
            for key in self.possible_children:
                # If key is in counts, there is at least one entry of
                # that item and it can be checked for meeting minimums and maximums.
                if key in counts:
                    if counts[key] < self.possible_children[key].min \
                            or counts[key] > self.possible_children[key].max:
                        return False
                # If key is not in counts, it only needs to be checked that
                # that possible child doesn't have a minimum, or else
                # the list is invalid.
                else:
                    if self.possible_children[key].min > 0:
                        return False

        return True

    def add_child(self, entry: ListEntry):
        self.children[entry.entry_id] = entry

    def remove_child(self, entry_id: int):
        self.children.pop(entry_id)

    def test_new_entry(self, new_entry: ListEntry) -> bool:
        test_al = copy.deepcopy(self)
        test_al.add_child(new_entry)
        return test_al.validate()

    def test_and_add_entry(self, new_entry: ListEntry) -> bool:
        if self.test_new_entry(new_entry):
            self.add_child(new_entry)
            return True
        else:
            return False

    def has_child(self, lookup_id: int) -> bool:
        return lookup_id in self.children


class EmptyListEntry(ListEntry):
    def __init__(self):
        self.item = None
        self.children: dict[int, ListEntry] = {}
        self.entry_id = None
        self.possible_children = {}


class ArmyList:
    def __init__(self, created: datetime.datetime, modified: datetime.datetime, name: str, rules: Ruleset, items: dict[int, ListItem]):
        self.created = created
        self.modified = modified
        self.name = name
        self.root: ListEntry = EmptyListEntry()
        self.rules = rules
        self.items = items
        self.cursor: ListEntry = self.root
        self.id_counter: int = 1
        self.possible_roots: dict[int, ListItem] = {}
        for key in self.items:
            if self.items[key].parent is None:
                self.possible_roots[key] = self.items[key]

    def get_entry_by_id(self, entry_id) -> ListEntry:
        # breakpoint()
        if self.cursor.entry_id == entry_id:
            return self.cursor
        elif entry_id in self.cursor.children:
            return self.cursor.children[entry_id]
        else:
            frontier: list[ListEntry] = []
            frontier.append(self.root)
            while len(frontier) > 0:
                current = frontier.pop()
                if current.entry_id == entry_id:
                    return current
                else:
                    for key in current.children:
                        frontier.append(current.children[key])
            return EmptyListEntry()

    def validate(self) -> bool:
        return self.root.validate()

    def validate_from_cursor(self) -> bool:
        return self.cursor.validate()

    def add_item_by_id(self, new_item_id: int) -> int:
        if new_item_id in self.cursor.possible_children:
            new_entry = self.generate_entry(self.cursor.possible_children[new_item_id])
            self.cursor.add_child(new_entry)
            return new_entry.entry_id
        else:
            return -1

    def move_cursor(self, new_location: int):
        if not self.get_entry_by_id(new_location) is EmptyListEntry:
            self.cursor = self.get_entry_by_id(new_location)
        else:
            raise ValueError

    def remove_entry(self, entry_id: int, full_tree: bool = False) -> bool:
        if full_tree:
            return False
        else:
            if entry_id in self.cursor.children:
                self.cursor.remove_child(entry_id)
                return True
            else:
                return False

    def get_item_possible_children(self, item_id: int) -> dict[int, ListItem]:
        output: dict[int, ListItem] = {}
        for key in self.items:
            if self.items[key].parent == item_id:
                output[key] = self.items[key]
        return output

    def generate_entry(self, new_item) -> ListEntry:
        new_id = self.id_counter
        self.id_counter += 1
        pc = self.get_item_possible_children(new_item.id)
        return ListEntry(new_item, new_id, pc)

    def test_new_item(self, new_item: ListItem) -> bool:
        new_entry = self.generate_entry(new_item)
        return self.cursor.test_new_entry(new_entry)

    def set_root(self, root_id: int) -> bool:
        if root_id in self.possible_roots:
            self.root = self.generate_entry(self.possible_roots[root_id])
            self.cursor = self.root
            return True
        else:
            return False
