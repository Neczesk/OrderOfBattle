import unittest
import sqlite3

from db import dbconnection
from listdata.ruleset import rulesetdao
from listdata.ruleset import ruleset as rules
from listdata.ruleset import list_item
from listdata import list_db


class TestDatabaseMethods(unittest.TestCase):
    def test_Connection(self):
        path = "../army_lists.db"
        self.assertIsInstance(
            dbconnection.create_connection(path), sqlite3.Connection)

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

    def test_all_list_item_retrieval(self):
        path = "../army_lists.db"
        conn = dbconnection.create_connection(path)
        items_dict = list_item.get_all_list_items(conn)
        self.assertIsInstance(items_dict, dict)
        self.assertIsInstance(items_dict[3], list_item.List_Item)
        self.assertEqual(str(
            items_dict[3]), "TEST CHILD 2: TEST CHILD 2\nChild of: 10\nCost: 25|Min: 0|Max: 2")

    def test_items_for_ruleset_retrieval(self):
        path = "../army_lists.db"
        conn = dbconnection.create_connection(path)
        items_d = list_item.get_list_items_for_ruleset(conn, 3)
        self.assertEqual(len(items_d), 6)


if __name__ == '__main__':
    unittest.main()
