from django.contrib import admin
from service_user.models import LoginModuleModel


@admin.register(LoginModuleModel)
class LoginModuleAdmin(admin.ModelAdmin):
    pass
