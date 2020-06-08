from django.contrib import admin
from service_application.models import ApplicationModel


@admin.register(ApplicationModel)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ["name", "app_id", "url", "public_option", "publish_date"]
    list_display_links = ["name", "app_id", "url"]

    readonly_fields = ["app_id"]
    fieldsets = [
        (None, {
            "fields": ["app_id", "name", "description", "url"]
        }),
        ("이미지", {
            "fields": ["icon", "preview_image"]
        }),
        ("공개", {
            "fields": ["public_option", "publish_date"]
        })
    ]

