

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


class Ruleset:
    def __init__(self, name: str, id: int, version: Version, desc: str):
        self.name = name
        self.version = version


if __name__ == "__main__":

    throw = Ruleset("Flames of War (Late War)", 1, Version(3, 2, 1), "The game of world war 2 1944-1945")

    try:
        r = Ruleset("Flames of War (Mid War)", 2, Version(4,2,1), "The game of world war 2 1942-1943")
    except:
        print("Failed to create ruleset")
