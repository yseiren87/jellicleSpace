from rest_framework import mixins, generics, status
from rest_framework.response import Response
from .serializer import InstallSerializer
from service_user.exports import get_user_instance_with_token_id
from service_application.exports import get_app_instance_with_app_id
from service_application.models import UsingApplicationModel
from utils import log, ParameterKeys, get_serializer_error_code


class InstallAPI(generics.GenericAPIView, mixins.CreateModelMixin):
    serializer_class = InstallSerializer

    def post(self, request):
        log(self.post, params=request.data)

        # get user instance
        _ui = get_user_instance_with_token_id(
            user_id=request.data.get(ParameterKeys.USER_ID, None),
            token_id=request.data.get(ParameterKeys.TOKEN_ID, None)
        )
        if _ui is None:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_USER
            })

        # get application instance
        _ai = get_app_instance_with_app_id(
            app_id=request.data.get(ParameterKeys.APPLICATION_ID)
        )
        if _ai is None:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_APPLICATION
            })

        # response
        serializer = self.get_serializer(data={
            "application": _ai.id,
            "user": _ui.id,
            "order": len(UsingApplicationModel.objects.filter(user_id=_ui.id)) + 1
        })

        if serializer.is_valid():
            serializer.save()

            ret = {
                ParameterKeys.STATUS: ParameterKeys.SUCCESS,
                ParameterKeys.APPLICATION_ID: str(_ai.app_id)
            }

            log(self.post, data=ret)
            return Response(ret, status=status.HTTP_201_CREATED)

        log(self.post, errors=serializer.errors)
        return Response({
            ParameterKeys.STATUS: ParameterKeys.INVALID,
            ParameterKeys.CODE: get_serializer_error_code(serializer)
        })
