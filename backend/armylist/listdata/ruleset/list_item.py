from __future__ import annotations

import sqlite3


class Item_Info:
    def __init__(self, name: str, desc: str, ruleset_id: str, item_id: str):
        self.name = name
        self.desc = desc
        self.ruleset_id = str(ruleset_id)
        self.item_id = str(item_id)


class List_Item:
    def __init__(self, relation_id: str, item_id: str, parent_id: str, cost: int, min: int, max: int, category: str):
        self.name: str
        self.desc: str
        self.id: str = str(item_id)
        self.ruleset_id: str
        self.relation_id: str = str(relation_id)
        self.parent: str = str(parent_id)
        self.cost = cost
        self.min: int = min
        self.max: int = max
        self.category: str = category

    def __str__(self) -> str:
        return self.name + ": " + self.desc + "\nChild of: " + str(self.parent) + "\nCost: "
        + str(self.cost) + "|Min: " + str(self.min) + "|Max: " + str(self.max)

    def set_info(self, info: Item_Info):
        self.name = info.name
        self.desc = info.desc
        self.ruleset_id = info.ruleset_id


def get_all_list_items(conn: sqlite3.Connection) -> dict:
    conn.row_factory = sqlite3.Row
    relations_query = "SELECT relation_id, relation_item, relation_parent, relation_cost, relation_min, relation_max, relation_category FROM item_relations"
    cursor = conn.execute(relations_query)
    relations_list = cursor.fetchall()
    relations_dict: dict[str, List_Item] = {}
    for row in relations_list:
        new_relation = List_Item(relation_id=row["relation_id"], item_id=row["relation_item"],
                                 parent_id=row["relation_parent"], cost=row["relation_cost"],
                                 min=row["relation_min"], max=row["relation_max"], category=row["relation_category"])
        relations_dict[new_relation.relation_id] = new_relation
    item_query = "SELECT item_name, item_id, item_description, item_ruleset FROM list_item"
    cursor = conn.execute(item_query)
    items_list = cursor.fetchall()
    items_dict: dict[str, Item_Info] = {}
    for row in items_list:
        new_item = Item_Info(name=row["item_name"], desc=row["item_description"],
                             ruleset_id=row["item_ruleset"], item_id=row["item_id"])
        items_dict[new_item.item_id] = new_item
    for relation in relations_dict:
        r = relations_dict[relation]
        r_info = items_dict[r.id]
        r.set_info(r_info)
    return relations_dict


def get_list_items_for_ruleset(conn: sqlite3.Connection, ruleset_id: int) -> dict[str, List_Item]:
    conn.row_factory = sqlite3.Row
    item_query = """SELECT relation_id, relation_item, relation_parent, relation_cost, relation_min, relation_max, item_name, item_id,
        item_description, item_ruleset, relation_category
        FROM item_relations INNER JOIN list_item ON relation_item = item_id
        WHERE item_ruleset = ?;"""
    cur = conn.execute(item_query, (ruleset_id,))
    relations_list = cur.fetchall()
    items_dict: dict[str, List_Item] = {}
    for row in relations_list:
        new_item = List_Item(relation_id=row["relation_id"], item_id=row["relation_item"], parent_id=row["relation_parent"],
                             cost=row["relation_cost"], min=row["relation_min"], max=row["relation_max"], category=row["relation_category"])
        new_info = Item_Info(name=row["item_name"], desc=row["item_description"],
                             ruleset_id=row["item_ruleset"], item_id=row["item_id"])
        new_item.set_info(new_info)
        items_dict[new_item.relation_id] = new_item
    return items_dict
