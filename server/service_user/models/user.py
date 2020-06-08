from django.db import models
from django.utils.timezone import now
from uuid import uuid4
from service_user.constants import UserStatus
from utils import HashUtil


class UserModel(models.Model):
    username = models.CharField(unique=True, max_length=50, verbose_name="사용자 이름")
    password = models.CharField(max_length=254, verbose_name="사용자 암호")
    email = models.EmailField(null=True, default=None, verbose_name="이메일")

    # Status
    status = models.CharField(max_length=20, choices=UserStatus.get_choice(), default=UserStatus.NORMAL.key,
                              verbose_name="상태")

    # Auto
    user_id = models.UUIDField(default=uuid4, editable=False, unique=True, verbose_name="번호")
    session_id = models.CharField(max_length=254, default=HashUtil.get_session_id, editable=False, unique=True,
                                  verbose_name="세션")
    token_id = models.CharField(max_length=254, default=HashUtil.get_token_id, editable=False, unique=True,
                                verbose_name="토큰")

    join_date = models.DateTimeField(default=now, editable=False, verbose_name="가입 날짜")
    login_date = models.DateTimeField(default=now, editable=False, verbose_name="접속 날짜")
    exit_date = models.DateTimeField(default=now, editable=False, verbose_name="탈퇴 날짜")

    class Meta:
        db_table = "user"
        verbose_name = "이용자"
        verbose_name_plural = "이용자들"
        indexes = [
            models.Index(fields=["user_id"]),
            models.Index(fields=["user_id", "session_id"]),
            models.Index(fields=["username"])
        ]

    def __str__(self):
        return "%s [%s]" % (self.username, self.user_id)
