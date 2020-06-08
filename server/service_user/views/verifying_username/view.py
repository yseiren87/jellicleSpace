from rest_framework import mixins, generics
from rest_framework.response import Response
from service_user.models import UserModel, InvalidUserNameModel
from utils import log, ParameterKeys


class VerifyingUsernameAPI(generics.GenericAPIView, mixins.RetrieveModelMixin):

    def get(self, request):
        log(self.get, query_params=request.query_params)

        username = request.query_params.get(ParameterKeys.USERNAME, None)

        # Blank
        if username is None or username == "":
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_BLANK
            })

        # Invalid Username
        try:
            _iu = InvalidUserNameModel.objects.get(
                avail=True,
                username__exact=username
            )
        except InvalidUserNameModel.DoesNotExist:
            _iu = None

        if _iu is not None:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_NOT_ALLOWED
            })

        # Exist user
        try:
            _ui = UserModel.objects.get(
                username__exact=username,
            )
        except UserModel.DoesNotExist:
            _ui = None

        if _ui is not None:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_UNIQUE
            })

        return Response({
            ParameterKeys.STATUS: ParameterKeys.SUCCESS,
            ParameterKeys.CODE: ParameterKeys.VALID_VERIFIED
        })
