import sqlite3

from . import ruleset

def get_ruleset(conn: sqlite3.Connection, id:int) -> ruleset.Ruleset:
	cur = conn.cursor()
	ruleset_query = "SELECT ruleset_name, ruleset_id, ruleset_version, ruleset_desc FROM ruleset WHERE ruleset_id = ?"
	results = cur.execute(ruleset_query, [id])
	rulesets = results.fetchall()
	out = rulesets[0]
	out = ruleset.Ruleset(out[0], out[1], out[2], out[3])
	return out

def get_all_rulesets(conn: sqlite3.Connection) -> list:
	cur = conn.cursor()
	rulesets_query = "SELECT ruleset_name, ruleset_id, ruleset_version, ruleset_desc FROM ruleset"
	results = cur.execute(rulesets_query)
	rulesets = results.fetchall()
	out = []
	for item in rulesets:
		out.append(ruleset.Ruleset(item[0], item[1], item[2], item[3]))
	return out

