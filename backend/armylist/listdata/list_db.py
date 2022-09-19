import sqlite3
import datetime
from typing import Optional
import jsonpickle

from .army_list import ArmyList


class list_data:
    def __init__(self):
        self.ID: int = -1
        self.army_list: ArmyList
        self.created: datetime.datetime = datetime.datetime.now()
        self.modified: datetime.datetime = datetime.datetime.now()
        self.name: str = ""


def get_all_saved_lists() -> dict[int, list_data]:
    pass


def get_list_by_id(ID: int) -> list_data:
    pass


def save_list_to_file(armyList: ArmyList, conn: sqlite3.Connection) -> Optional[int]:
    if armyList.ID == -1:
        data = list_data()
        data.army_list = armyList
        data.name = armyList.name
        insert_query: str = """INSERT INTO saved_lists (list_name, list_creation_datetime, list_modified_datetime, list_contents) VALUES
         (?, ?, ?, ?);"""
        cur = conn.execute(insert_query, (data.name, data.created, data.modified, jsonpickle.encode(data.army_list, make_refs=False)))
        conn.commit()
        return cur.lastrowid
    else:
        data = list_data()
        data.army_list = armyList
        data.name = armyList.name
        data.ID = armyList.ID
        update_query: str = """UPDATE saved_lists SET (list_name, list_modified_datetime, list_contents) = (?,?,?) WHERE (list_ID = ?);"""
        cur = conn.execute(update_query, (data.name, datetime.datetime.now(), jsonpickle.encode(data.army_list), data.ID))
        conn.commit()
        return cur.lastrowid


def delete_list_from_file(ID: int) -> bool:
    pass
