from rest_framework import serializers
from service_user.models import UserModel


class LoginSerializer(serializers.ModelSerializer):
    loginDate = serializers.DateTimeField(source="login_date", write_only=True)

    userId = serializers.UUIDField(source="user_id", read_only=True)
    sessionId = serializers.CharField(source="session_id", read_only=True)
    userStatus = serializers.CharField(source="status", read_only=True)

    class Meta:
        model = UserModel
        fields = ["userId", "sessionId", "loginDate", "userStatus"]
