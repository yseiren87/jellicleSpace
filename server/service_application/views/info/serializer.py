from rest_framework import serializers
from service_application.models import ApplicationModel
from service_application.exports import is_installed_application
from utils import ParameterKeys


class InfoSerializer(serializers.ModelSerializer):
    appId = serializers.CharField(source="app_id", read_only=True)
    iconUrl = serializers.CharField(source="icon_url", read_only=True)
    previewImageUrl = serializers.CharField(source="preview_image_url", read_only=True)
    publishDate = serializers.DateTimeField(source="publish_date", read_only=True)
    installed = serializers.SerializerMethodField("is_installed", read_only=True)

    class Meta:
        model = ApplicationModel
        fields = ["appId", "name", "description", "url", "iconUrl", "previewImageUrl", "publishDate", "installed"]
        extra_kwargs = {
            "appId": {
                "lookup_field": "app_id"
            },
            "name": {
                "read_only": True
            },
            "description": {
                "read_only": True
            },
            "url": {
                "read_only": True
            }
        }

    def is_installed(self, obj):
        return is_installed_application(
            app_id=obj.app_id,
            user_id=self.context[ParameterKeys.USER_ID]
        )
