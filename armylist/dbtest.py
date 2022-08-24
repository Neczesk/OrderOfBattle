import unittest
import sqlite3

from db import dbconnection
from ruleset import rulesetdao
from ruleset import ruleset as rules

class TestDatabaseMethods(unittest.TestCase):
	def test_Connection(self):
		path = "../army_lists.db"
		self.assertIsInstance(dbconnection.create_connection(path), sqlite3.Connection)

	def test_ruleset_retrieval(self):
		path = "../army_lists.db"
		conn = dbconnection.create_connection(path)
		rt = rulesetdao.get_ruleset(conn, 1)
		self.assertIsInstance(rt, rules.Ruleset)
		self.assertEqual("Flames of War (Late War)", rt.name)

	def test_all_rulesets_retrieval(self):
		path = "../army_lists.db"
		conn = dbconnection.create_connection(path)
		rulesets_list = rulesetdao.get_all_rulesets(conn)
		self.assertIsInstance(rulesets_list, list)
		self.assertIsInstance(rulesets_list[0], rules.Ruleset)
if __name__ == '__main__':
    unittest.main()