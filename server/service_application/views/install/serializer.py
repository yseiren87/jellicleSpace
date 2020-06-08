from rest_framework import serializers
from service_application.models import UsingApplicationModel


class InstallSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsingApplicationModel
        fields = ["application", "user", "order"]
        extra_kwargs = {
            "application": {
                "write_only": True,
                "read_only": False
            },
            "user": {
                "write_only": True,
                "read_only": False
            },
            "order": {
                "write_only": True,
                "read_only": False
            },
        }
