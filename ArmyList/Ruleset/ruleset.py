

class Version:
    def __init__(self, major: int, minor: int, release: int):
        self.major = major
        self.minor = minor
        self.release = release

    def __str__(self):
        out = str(self.major) + "." \
            + str(self.minor)  \
            + "." + str(self.release)
        return out


class Ruleset:
    def __init__(self, name: str, id: int, version: type[Version]):
        self.name = name
        self.version = version


if __name__ == "__main__":
    new_version = Version(3, 4, 12)
    print(new_version)

    throw = Ruleset("Flames of War (Late War)", 1, Version(3, 2, 1))

    try:
        r = Ruleset("Flames of War (Mid War)", 2, 4.23)
    except:
        print("Failed to create ruleset")
