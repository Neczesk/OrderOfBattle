from flask import Flask

from armylist.listdata.ruleset import rulesetdao
from armylist.db import dbconnection
app = Flask(__name__)

path = "army_lists.db"
conn = dbconnection.create_connection(path)


@app.route("/getrulesets")
def get_available_rulesets():
    rulesets_list = rulesetdao.get_all_rulesets(conn)
    return [r.toJson() for r in rulesets_list]


@app.route("/getemptyarmylist")
def get_empty_armylist():
    pass
