from django.contrib import admin
from service_application.models import UsingApplicationModel


@admin.register(UsingApplicationModel)
class UsingApplicationAdmin(admin.ModelAdmin):
    list_display = ["application", "user", "order", "installed_date"]
    list_display_links = ["application", "user", "order", "installed_date"]

    readonly_fields = ["installed_date"]
