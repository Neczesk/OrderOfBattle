import unittest
import sqlite3

from db import dbconnection
from listdata.ruleset import rulesetdao
from listdata.ruleset import ruleset as rules
from listdata.ruleset import list_item
from listdata.army_list import ListEntry

class TestDatabaseMethods(unittest.TestCase):
	def test_new_list_entry(self):
		path = "../army_lists.db"
		conn = dbconnection.create_connection(path)
		items_d = list_item.get_all_list_items(conn)
		new_list_entry = ListEntry(items_d[5], 0)

	def test_validation(self):
		path = "../army_lists.db"
		conn = dbconnection.create_connection(path)
		items_d = list_item.get_all_list_items(conn)
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
		path = "../army_lists.db"
		conn = dbconnection.create_connection(path)
		items_d = list_item.get_all_list_items(conn)
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


if __name__ == '__main__':
    unittest.main()