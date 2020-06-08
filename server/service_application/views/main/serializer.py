from rest_framework import serializers
from service_application.models import UsingApplicationModel


class MainSerializer(serializers.ModelSerializer):
    appId = serializers.CharField(source="application_app_id", read_only=True)
    name = serializers.CharField(source="application_name", read_only=True)
    url = serializers.CharField(source="application_url", read_only=True)
    iconUrl = serializers.CharField(source="application_icon_url", read_only=True)

    class Meta:
        model = UsingApplicationModel
        fields = ["appId", "name", "url", "iconUrl"]

