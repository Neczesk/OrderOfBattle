from __future__ import annotations

import copy

from .ruleset.list_item import List_Item as ListItem

# TODO: Update validation to take into account possible children that are not currently children of the List Entry
#       Add possible_children as member of ListEntry sourced from the constructor
class ListEntry:
	def __init__(self, li: ListItem, entry_id: int):
		self.item = li
		self.children: dict[int, ListEntry] = {}
		self.entry_id = entry_id

	def validate(self) -> bool:
		for child in self.children:
			result = self.children[child].validate()
			if not result:
				return False
		counts: dict[int, int] = {}
		for child in self.children:
			if self.children[child].item.id in counts:
				counts[self.children[child].item.id] += 1
			else:
				counts[self.children[child].item.id] = 1
		unique_items: dict[int, ListItem] = {}
		for key in self.children:
			if not self.children[key].item.id in unique_items:
				unique_items[self.children[key].item.id] = self.children[key].item
		for key in counts:
			if counts[key] < unique_items[key].min or counts[key] > unique_items[key].max:
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

class ArmyList:
	pass