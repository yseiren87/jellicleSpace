from rest_framework import mixins, generics
from rest_framework.response import Response
from datetime import datetime
from .serializer import LoginSerializer
from service_user.models import UserModel
from service_user.constants import UserStatus
from utils import HashUtil, log, ParameterKeys, get_serializer_error_code


class LoginAPI(generics.GenericAPIView, mixins.CreateModelMixin):
    serializer_class = LoginSerializer

    def get_queryset(self):
        username = self.request.data.get(ParameterKeys.USERNAME, None)
        password = HashUtil.get_password(self.request.data.get(ParameterKeys.PASSWORD, None))
        log(self.post, username=username, password=password)

        try:
            return UserModel.objects.get(
                username__exact=username,
                password__exact=password
            )
        except UserModel.DoesNotExist:
            return None

    def post(self, request):
        instance = self.get_queryset()
        if instance is None:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_USER
            })

        # updating login_date und token_id
        serializer = self.get_serializer(instance, data={
            ParameterKeys.LOGIN_DATE: datetime.now()
        }, partial=True)

        if serializer.is_valid():

            if instance.status == UserStatus.NORMAL.key:
                serializer.save()

                ret = {ParameterKeys.STATUS: ParameterKeys.SUCCESS}
                ret.update(serializer.data)

            else:
                ret = {
                    ParameterKeys.STATUS: ParameterKeys.INVALID,
                    ParameterKeys.CODE: ParameterKeys.INVALID_USER
                }
                ret.update({
                    ParameterKeys.USER_STATUS: serializer.data.get(ParameterKeys.USER_STATUS, None)
                })

            log(self.post, data=ret)
            return Response(ret)

        log(self.post, errors=serializer.errors)
        return Response({
            ParameterKeys.STATUS: ParameterKeys.INVALID,
            ParameterKeys.CODE: get_serializer_error_code(serializer)
        })
