import unittest
import sqlite3
import datetime

from db import dbconnection
from listdata.ruleset import rulesetdao
from listdata.ruleset import ruleset as rules
from listdata.ruleset import list_item
from listdata.army_list import ListEntry, ArmyList, EmptyListEntry



class TestListEntry(unittest.TestCase):
	def setUp(self):
		self.path = "../army_lists.db"
		self.conn: sqlite3.Connection = dbconnection.create_connection(self.path)
	
	def test_new_list_entry(self):
		items_d = list_item.get_all_list_items(self.conn)
		new_list_entry = ListEntry(items_d[5], 0)

	def test_validation(self):
		items_d = list_item.get_all_list_items(self.conn)
		ch: dict[int, list_item.ListItem] = {}
		for item in items_d:
			if items_d[item].parent == 12:
				ch[items_d[item].id] = items_d[item]
		self.assertEqual(len(ch), 2)
		new_list_entry = ListEntry(items_d[5], 0, ch)
		self.assertFalse(new_list_entry.validate())
		child_list_entry = ListEntry(items_d[2], 1)
		new_list_entry.add_child(child_list_entry)
		self.assertTrue(new_list_entry.validate())
		child_4 = ListEntry(items_d[6], 4)
		new_list_entry.add_child(child_4)
		self.assertTrue(new_list_entry.validate())
		child_2 = ListEntry(items_d[2], 2)
		child_3 = ListEntry(items_d[2], 3)
		new_list_entry.add_child(child_2)
		new_list_entry.add_child(child_3)
		self.assertFalse(new_list_entry.validate())

	def test_new_entry_validation(self):
		items_d = list_item.get_all_list_items(self.conn)
		ch: dict[int, list_item.ListItem] = {}
		for item in items_d:
			if items_d[item].parent == 12:
				ch[items_d[item].id] = items_d[item]
		neon_root = ListEntry(items_d[5], 0, ch)
		child_1 = ListEntry(items_d[2], 1)
		child_2 = ListEntry(items_d[2], 2)
		child_3 = ListEntry(items_d[6], 3)
		child_4 = ListEntry(items_d[6], 4)
		self.assertFalse(neon_root.validate())
		neon_root.add_child(child_1)
		self.assertTrue(neon_root.validate())
		self.assertTrue(neon_root.test_new_entry(child_3))
		neon_root.add_child(child_3)
		self.assertTrue(neon_root.validate())
		self.assertTrue(3 in neon_root.children)
		self.assertFalse(neon_root.test_new_entry(child_4))
		self.assertFalse(neon_root.test_and_add_entry(child_4))
		self.assertFalse(4 in neon_root.children)
		neon_root.remove_child(3)
		self.assertFalse(3 in neon_root.children)
		self.assertTrue(neon_root.test_new_entry(child_4))
		self.assertFalse(4 in neon_root.children)
		self.assertTrue(neon_root.test_and_add_entry(child_4))
		self.assertTrue(4 in neon_root.children)

class TestArmyList(unittest.TestCase):

	def setUp(self):
		self.path = "../army_lists.db"
		self.conn: sqlite3.Connection = dbconnection.create_connection(self.path)

	def test_new_army_list(self):
		items_d = list_item.get_list_items_for_ruleset(self.conn, 3)
		neon = rulesetdao.get_ruleset(self.conn, 3)
		new_list = ArmyList(datetime.datetime.today(), datetime.datetime.today(), "TEST", neon, items_d)
		self.assertIsInstance(new_list, ArmyList)
		self.assertTrue(new_list.set_root(5))
		self.assertEqual(new_list.root, new_list.cursor)
		self.assertEqual(new_list.root.item.relation_id, 5)
		self.assertGreaterEqual(new_list.add_item_by_id(2), 0)
		self.assertNotIsInstance(new_list.root.children[2], EmptyListEntry)
		self.assertIsNot(new_list.root.entry_id, None)
		self.assertIsNot(new_list.root.children[2].entry_id, None)
		new_list.move_cursor(2)
		self.assertIsNot(new_list.cursor.entry_id, None)
		self.assertNotEqual(new_list.cursor, new_list.root)
		self.assertFalse(new_list.validate())
		new_list.move_cursor(new_list.add_item_by_id(1))
		self.assertFalse(new_list.validate())
		self.assertEqual(new_list.cursor.entry_id, 3)
		self.assertIsNot(new_list.cursor.entry_id, None)
		self.assertNotIsInstance(new_list.cursor, EmptyListEntry)
		print(type(new_list.cursor))
		# breakpoint()
		new_list.move_cursor(2)
		# print(new_list.cursor.entry_id)
		print(type(new_list.cursor))
		self.assertNotIsInstance(new_list.cursor, EmptyListEntry)
		# self.assertTrue(new_list.validate())


if __name__ == '__main__':
    unittest.main()