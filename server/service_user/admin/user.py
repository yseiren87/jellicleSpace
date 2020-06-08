from django.contrib import admin
from service_user.models import UserModel


@admin.register(UserModel)
class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "user_id", "login_date"]

    readonly_fields = ["username", "user_id", "session_id", "token_id", "join_date", "login_date", "exit_date"]
    fieldsets = [
        (None, {
            "fields": ["username", "password", "email", "status"]
        }),
        ("info", {
            "fields": ["user_id", "session_id", "token_id"]
        }),
        ("dates", {
            "fields": ["join_date", "login_date", "exit_date"]
        })
    ]
