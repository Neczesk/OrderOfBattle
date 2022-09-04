import sqlite3

class Item_Info:
	def __init__(self, name: str, desc: str, ruleset_id: int, item_id: int):
		self.name = name
		self.desc = desc
		self.ruleset_id = ruleset_id
		self.item_id = item_id

class List_Item:
	def __init__(self, relation_id: int, item_id: int, parent_id: int, cost: int, min: int, max: int):
		self.name: str
		self.desc: str
		self.id = item_id
		self.ruleset_id: int
		self.relation_id = relation_id
		self.parent = parent_id
		self.cost = cost
		self.min = min
		self.max = max

	def __str__(self) -> str:
		return self.name + ": " + self.desc + "\nChild of: " + str(self.parent) + "\nCost: " + str(self.cost) + "|Min: " + str(self.min) + "|Max: " + str(self.max)

	def set_info(self, info: Item_Info):
		self.name = info.name
		self.desc = info.desc
		self.ruleset_id = info.ruleset_id






def get_all_list_items(conn: sqlite3.Connection) -> dict:
	conn.row_factory = sqlite3.Row
	relations_query = "SELECT relation_id, relation_item, relation_parent, relation_cost, relation_min, relation_max FROM item_relations"
	cursor = conn.execute(relations_query)
	relations_list = cursor.fetchall()
	relations_dict: dict[int, List_Item] = {}
	for row in relations_list:
		new_relation = List_Item(relation_id = row["relation_id"], item_id = row["relation_item"], parent_id = row["relation_parent"], cost=row["relation_cost"], min = row["relation_min"], max = row["relation_max"])
		relations_dict[new_relation.relation_id] = new_relation
	item_query = "SELECT item_name, item_id, item_description, item_ruleset FROM list_item"
	cursor = conn.execute(item_query)
	items_list = cursor.fetchall()
	items_dict: dict[int, Item_Info] = {}
	for row in items_list:
		new_item = Item_Info(name=row["item_name"], desc = row["item_description"], ruleset_id = row["item_ruleset"], item_id=row["item_id"])
		items_dict[new_item.item_id] = new_item
	for relation in relations_dict:
		r = relations_dict[relation]
		r_info = items_dict[r.id]
		r.set_info(r_info)
	return relations_dict