from rest_framework import serializers
from rest_framework.exceptions import ErrorDetail
from service_user.models import UserModel, InvalidUserNameModel
from utils import log, ParameterKeys


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["username", "email"]
        extra_kwargs = {
            "user_id": {
                "lookup_field": "user_id"
            }
        }

    # Field Validator
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
