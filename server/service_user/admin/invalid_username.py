from django.contrib import admin
from service_user.models import InvalidUserNameModel


@admin.register(InvalidUserNameModel)
class InvalidUserNameAdmin(admin.ModelAdmin):
    list_display = ["username", "avail"]
    list_display_links = ["username"]
