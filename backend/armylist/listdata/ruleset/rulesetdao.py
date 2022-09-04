import sqlite3

from . import ruleset

def get_ruleset(conn: sqlite3.Connection, id:int) -> ruleset.Ruleset:
	conn.row_factory = sqlite3.Row
	ruleset_query = "SELECT ruleset_name, ruleset_id, ruleset_version, ruleset_desc, ruleset_creator, ruleset_created, ruleset_modified, ruleset_last_modifier FROM ruleset WHERE ruleset_id = ?"
	cursor = conn.execute(ruleset_query, [id])
	rulesets = cursor.fetchall()
	out = rulesets[0]
	out = ruleset.Ruleset(name = out['ruleset_name'], version = out['ruleset_version'], ruleset_id = out['ruleset_id'], desc = out['ruleset_desc'], created = out['ruleset_created'], modified = out['ruleset_modified'], creator = out['ruleset_creator'], modifier = out['ruleset_last_modifier'] )
	return out

def get_all_rulesets(conn: sqlite3.Connection) -> list:
	conn.row_factory = sqlite3.Row
	rulesets_query = "SELECT ruleset_name, ruleset_id, ruleset_version, ruleset_desc, ruleset_creator, ruleset_created, ruleset_modified, ruleset_last_modifier FROM ruleset"
	cursor = conn.execute(rulesets_query)
	rulesets = cursor.fetchall()
	out = []
	for item in rulesets:
		out.append(ruleset.Ruleset(name = item['ruleset_name'], version = item['ruleset_version'], ruleset_id = item['ruleset_id'], desc = item['ruleset_desc'], created = item['ruleset_created'], modified = item['ruleset_modified'], creator = item['ruleset_creator'], modifier = item['ruleset_last_modifier'] ))
	return out

