import unittest
from server.utils.choice import Choice, ChoiceUtil


class UserStatus(ChoiceUtil):
    NORMAL = Choice("normal", "일반")
    # HOLIDAY = Choice("holiday", "휴면")
    # EXIT = Choice("exit", "탈퇴")


class MyTestCase(unittest.TestCase):
    def test_something(self):
        # print(UserStatus.NORMAL, type(UserStatus.NORMAL))

        a = type(UserStatus.NORMAL)
        print(a)

        print(UserStatus.get_choice())

if __name__ == '__main__':
    unittest.main()
