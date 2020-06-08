from rest_framework import serializers
from service_user.models import UserModel


class ExitSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["password", "email", "status", "exit_date"]
        extra_kwargs = {
            "userId": {
                "lookup_field": "user_id"
            },
            "password": {
                "write_only": True,
                "read_only": False
            },
            "email": {
                "write_only": True,
                "read_only": False
            },
            "status": {
                "write_only": True,
                "read_only": False
            },
            "exit_date": {
                "read_only": False,
                "write_only": True
            }
        }
