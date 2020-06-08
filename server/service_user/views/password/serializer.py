from rest_framework import serializers
from rest_framework.exceptions import ErrorDetail
from service_user.models import UserModel
from utils import HashUtil, log, ParameterKeys


class PasswordSerializer(serializers.ModelSerializer):
    newPassword = serializers.CharField(max_length=200, write_only=True)
    newPasswordCheck = serializers.CharField(max_length=200, write_only=True)

    class Meta:
        model = UserModel
        fields = ["password", "newPassword", "newPasswordCheck"]
        extra_kwargs = {
            "user_id": {
                "lookup_field": "user_id"
            },
            "password": {
                "write_only": True
            }
        }

    # Field Validation
    def validate_password(self, value):
        log(self.validate_password, value=value, password=HashUtil.get_password(value),
            instance_password=self.instance.password)

        if self.instance.password != HashUtil.get_password(value):
            raise serializers.ValidationError(detail="비밀번호가 다름", code=ParameterKeys.INVALID_NOT_EQUAL)

        return value

    def validate_newPassword(self, value):
        log(self.validate_newPassword, value=value)

        if self.instance.username == value:
            raise serializers.ValidationError(detail="비밀번호와 사용자이름이 같음", code=ParameterKeys.INVALID_EQUAL)

        if self.instance.password == HashUtil.get_password(value):
            raise serializers.ValidationError(detail="이전 비밀번호", code=ParameterKeys.INVALID_EQUAL2)

        return HashUtil.get_password(value)

    def validate_newPasswordCheck(self, value):
        log(self.validate_newPasswordCheck, value=value)
        return HashUtil.get_password(value)

    # Object Validation
    def validate(self, data):
        log(self.validate, data=data)

        if data.get(ParameterKeys.NEW_PASSWORD) != data.get(ParameterKeys.NEW_PASSWORD_CHECK):
            raise serializers.ValidationError({
                ParameterKeys.NEW_PASSWORD_CHECK: ErrorDetail("비밀번호 확인 다르게 입력", code=ParameterKeys.INVALID_NOT_EQUAL)
            })

        return data

    # DB Update
    def update(self, instance, validated_data):
        return super().update(instance=instance, validated_data={
            ParameterKeys.PASSWORD: validated_data.get(ParameterKeys.NEW_PASSWORD)
        })
