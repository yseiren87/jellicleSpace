from utils import Choice, ChoiceUtil


class UserStatus(ChoiceUtil):
    NORMAL = Choice("NORMAL", "일반")
    HOLIDAY = Choice("HOLIDAY", "휴면")
    EXIT = Choice("EXIT", "탈퇴")
