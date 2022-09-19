import datetime
import json

from flask import Flask, request
import jsonpickle

from armylist.listdata.ruleset import rulesetdao
from armylist.listdata import army_list
from armylist.listdata import list_db
from armylist.listdata.ruleset import list_item
from armylist.db import dbconnection
app = Flask(__name__)

path = "army_lists.db"
conn = dbconnection.create_connection(path)

session_state = {}


@app.route("/getrulesets")
def get_available_rulesets():
    rulesets_list = rulesetdao.get_all_rulesets(conn)
    return [r.toJson() for r in rulesets_list]


@app.route("/getruleset", methods=["POST"], strict_slashes=False)
def get_ruleset():
    ruleset_id = request.json['rulesetID']
    return rulesetdao.get_ruleset(conn, int(ruleset_id))


@app.route("/getemptyarmylist", methods=["POST"], strict_slashes=False)
def get_empty_armylist():
    ruleset_id = request.json['ruleset']
    name = request.json['name']
    selected_ruleset = rulesetdao.get_ruleset(conn, ruleset_id)
    ruleset_items = list_item.get_list_items_for_ruleset(conn, ruleset_id)
    new_list = army_list.ArmyList(datetime.datetime.today(), datetime.datetime.today(), name, selected_ruleset, ruleset_items)
    session_state["armyList"] = new_list
    return jsonpickle.encode(new_list, make_refs=False)


@app.route("/getarmylist", strict_slashes=False)
def get_army_list():
    if "armyList" in session_state:
        return jsonpickle.encode(session_state["armyList"], make_refs=False)
    else:
        return 'no saved list', 500


@app.route("/addroot", methods=["POST"], strict_slashes=False)
def add_route():
    root_id = str(request.json['root_id'])
    if "armyList" in session_state:
        armyList = session_state["armyList"]
        armyList.set_root(root_id)
        return jsonpickle.encode(armyList, make_refs=False)
    else:
        return 'no saved list', 500


@app.route("/additem", methods=["POST"], strict_slashes=False)
def add_item_to_list():
    new_item_id = request.json['addedRelID']
    if "armyList" in session_state:
        session_state["armyList"].add_item_by_id(new_item_id)
        return jsonpickle.encode(session_state["armyList"], make_refs=False)
    else:
        return 'no saved list', 500


@app.route("/removeentry", methods=["POST"], strict_slashes=False)
def remove_entry_from_list():
    removed_entry_id = request.json['removedEntryID']
    if "armyList" in session_state:
        status = session_state["armyList"].remove_entry(removed_entry_id)
        if status:
            return jsonpickle.encode(session_state["armyList"], make_refs=False)
        else:
            return 'error removing entry', 500
    else:
        return 'no saved list', 500


@app.route("/savelist")
def save_current_list():
    if "armyList" in session_state:
        rowid = list_db.save_list_to_file(session_state["armyList"], conn)
        session_state["armyList"].ID = rowid
        if rowid >= 0:
            return {"success": True, "rowid": rowid}
        else:
            return {"success": False, "errorMessage": "Error encountered while saving the list to database"}
    else:
        return {"success": False, "errorMessage": "There is no list to save."}
