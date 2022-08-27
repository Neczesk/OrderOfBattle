import time

from flask import Flask

from armylist.ruleset import rulesetdao
from armylist.db import dbconnection
app = Flask(__name__)

path = "army_lists.db"
conn = dbconnection.create_connection(path)


@app.route("/time")
def get_current_time():
	return {'time': time.time()}

@app.route("/getrulesets")
def get_available_rulesets():
	rulesets_list = rulesetdao.get_all_rulesets(conn)
	return rulesets_list