from django.db import models
from uuid import uuid4


def upload_to(instance, filename):
    return "login/module/%s.%s" % (uuid4().hex, filename.split(".")[-1])


class LoginModuleModel(models.Model):
    name = models.CharField(max_length=100, verbose_name="이름")

    description = models.TextField(verbose_name="설명")

    image = models.ImageField(upload_to=upload_to, verbose_name="이미지")

    public_option = models.BooleanField(default=False, verbose_name="공개 여부")

    order = models.IntegerField(default=1, verbose_name="순서")

    class Meta:
        db_table = "login_module"
        verbose_name = "로그인 모듈"
        verbose_name_plural = "로그인 모듈들"
        ordering = ["order"]

    def __str__(self):
        return "%s (%s)" % (self.name, self.description)

    @property
    def image_url(self):
        try:
            return self.image.url
        except ValueError:
            return None
