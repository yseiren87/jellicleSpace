from rest_framework import serializers
from rest_framework.exceptions import ErrorDetail
from service_user.models import UserModel, InvalidUserNameModel
from utils import HashUtil, log, ParameterKeys


class JoinSerializer(serializers.ModelSerializer):
    passwordCheck = serializers.CharField(max_length=50, write_only=True)

    userId = serializers.UUIDField(source="user_id", read_only=True)
    sessionId = serializers.CharField(source="session_id", read_only=True)

    class Meta:
        model = UserModel
        fields = ["username", "password", "passwordCheck", "email", "userId", "sessionId"]
        extra_kwargs = {
            "username": {
                "write_only": True
            },
            "password": {
                "write_only": True
            },
            "email": {
                "write_only": True
            },

        }

    def validate_username(self, value):
        log(self.validate_username, value=value)

        # Not acceptable username
        try:
            _in = InvalidUserNameModel.objects.get(
                avail=True,
                username=value
            )
        except InvalidUserNameModel.DoesNotExist:
            _in = None

        if _in is not None:
            raise serializers.ValidationError(
                ErrorDetail("특정 단어는 사용자 이름으로 사용할 수 없습니다.", code=ParameterKeys.INVALID_NOT_ALLOWED)
            )

        # exist username
        try:
            _i = UserModel.objects.get(username=value)
        except UserModel.DoesNotExist:
            _i = None

        if _i is not None:
            raise serializers.ValidationError(ErrorDetail("사용자 이름이 존재합니다.", code=ParameterKeys.INVALID_UNIQUE))

        return value

    def validate_password(self, value):
        log(self.validate_password, value=value)
        return HashUtil.get_password(value)

    def validate_passwordCheck(self, value):
        log(self.validate_passwordCheck, value=value)
        return HashUtil.get_password(value)

    def validate(self, data):
        log(self.validate, data=data)

        err_dict = {}

        if data.get("password") != data.get("passwordCheck"):
            err_dict["passwordCheck"] = ErrorDetail("패스워드가 다릅니다.", code=ParameterKeys.INVALID_NOT_EQUAL)

        if data.get("username") == data.get("password"):
            err_dict["password"] = ErrorDetail("사용자 이름과 비밀번호가 동일합니다.", code=ParameterKeys.INVALID_EQUAL)

        if len(err_dict.keys()) != 0:
            raise serializers.ValidationError(err_dict)

        del data["passwordCheck"]

        return data
