import datetime

from flask import Flask, request
import jsonpickle

from armylist.listdata.ruleset import rulesetdao
from armylist.listdata import army_list
from armylist.listdata.ruleset import list_item
from armylist.db import dbconnection
app = Flask(__name__)

path = "army_lists.db"
conn = dbconnection.create_connection(path)


@app.route("/getrulesets")
def get_available_rulesets():
    rulesets_list = rulesetdao.get_all_rulesets(conn)
    return [r.toJson() for r in rulesets_list]


@app.route("/getemptyarmylist", methods=["POST"], strict_slashes=False)
def get_empty_armylist():
    ruleset_id = request.json['ruleset']
    name = request.json['name']
    selected_ruleset = rulesetdao.get_ruleset(conn, ruleset_id)
    ruleset_items = list_item.get_list_items_for_ruleset(conn, ruleset_id)
    new_list = army_list.ArmyList(datetime.datetime.today(), datetime.datetime.today(), name, selected_ruleset, ruleset_items)
    return jsonpickle.encode(new_list)
