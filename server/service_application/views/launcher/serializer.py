from rest_framework import serializers
from service_application.models import ApplicationModel
from service_application.exports import is_installed_application
from utils import ParameterKeys


class LauncherSerializer(serializers.ModelSerializer):
    appId = serializers.CharField(source="app_id", read_only=True)
    iconUrl = serializers.CharField(source="icon_url", read_only=True)
    previewImageUrl = serializers.CharField(source="preview_image_url", read_only=True)
    installed = serializers.SerializerMethodField("is_installed", read_only=True)

    class Meta:
        model = ApplicationModel
        fields = ["appId", "name", "description", "url", "iconUrl", "previewImageUrl", "installed"]
        extra_kwargs = {
            "name": {
                "read_only": True
            },
            "description": {
                "read_only": True
            },
            "url": {
                "read_only": True
            },
        }

    def is_installed(self, obj):
        return is_installed_application(
            app_id=obj.app_id,
            user_id=self.context[ParameterKeys.USER_ID]
        )
