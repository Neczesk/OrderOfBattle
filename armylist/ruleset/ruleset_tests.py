import unittest

import ruleset

class TestRuleset(unittest.TestCase):
	def test_Version(self):
		self.assertEqual("3.2.1", str(ruleset.Version(3,2,1)))

	def test_VersionText(self):
		self.assertEqual("3.2.1", str(ruleset.Version(0,0,0,"3.2.1")))

if __name__ == '__main__':
    unittest.main()