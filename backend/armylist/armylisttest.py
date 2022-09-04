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
		new_list_entry = ListEntry(items_d[5], 0)
		child_list_entry = ListEntry(items_d[2], 1)
		new_list_entry.add_child(child_list_entry)
		self.assertTrue(new_list_entry.validate())
		child_2 = ListEntry(items_d[2], 2)
		child_3 = ListEntry(items_d[2], 3)
		new_list_entry.add_child(child_2)
		new_list_entry.add_child(child_3)
		self.assertFalse(new_list_entry.validate())


if __name__ == '__main__':
    unittest.main()