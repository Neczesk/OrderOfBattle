import jsonpickle

import datetime

class Version:
    def __init__(self, major: int, minor: int, release: int, text="NONE"):
        if text == "NONE":
            self.major = major
            self.minor = minor
            self.release = release
        else:
            numbers = text.split(".")
            if len(numbers) == 3:
                self.major = numbers[0]
                self.minor = numbers[1]
                self.release = numbers[2]
            else:
                self.major = 0
                self.minor = 0
                self.release = 0
    def __str__(self):
        out = str(self.major) + "." \
            + str(self.minor)  \
            + "." + str(self.release)
        return out

    def toJson(self):
        return jsonpickle.encode(self)


class Ruleset:
    def __init__(self, name: str, ruleset_id: int, version: Version, desc: str, creator: str, created: datetime.datetime, modifier: str, modified: datetime.datetime):
        self.name = name
        self.id = ruleset_id
        self.version = version
        self.description = desc
        self.creator = creator
        self.created_datetime = created
        self.last_modifier = modifier
        self.last_modified = modified


    def toJson(self):
        return jsonpickle.encode(self)