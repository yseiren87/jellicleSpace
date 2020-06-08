from django.db import models
from .application import ApplicationModel
from service_user.models import UserModel
from django.utils.timezone import now


class UsingApplicationModel(models.Model):
    application = models.ForeignKey(ApplicationModel, on_delete=models.CASCADE, verbose_name="어플리케이션")
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, verbose_name="사용자")

    order = models.IntegerField(default=1, verbose_name="순서")

    installed_date = models.DateTimeField(default=now, editable=False, verbose_name="설치 날짜")

    class Meta:
        db_table = "using_application"
        verbose_name = "사용중인 어플리케이션"
        verbose_name_plural = "사용중인 어플리케이션들"
        ordering = ["order"]
        unique_together = ("application", "user")

    def __str__(self):
        return "\"%s\" -- \"%s\" " % (self.user.username, self.application.name)

    @property
    def application_app_id(self):
        return self.application.app_id

    @property
    def application_name(self):
        return self.application.name

    @property
    def application_url(self):
        return self.application.url

    @property
    def application_icon_url(self):
        return self.application.icon_url
