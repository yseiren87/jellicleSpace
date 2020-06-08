from django.db import models


class InvalidUserNameModel(models.Model):
    username = models.CharField(unique=True, max_length=50, verbose_name="사용자 이름")
    avail = models.BooleanField(default=True, verbose_name="설정하기")

    class Meta:
        db_table = "invalid_username"
        verbose_name = "불가한 사용자 이름"
        verbose_name_plural = "불가한 사용자 이름들"
        indexes = [
            models.Index(fields=["username"]),
        ]

    def __str__(self):
        return "%s [%s]" % (self.username, self.avail)
