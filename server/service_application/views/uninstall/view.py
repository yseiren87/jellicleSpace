from rest_framework import mixins, generics
from rest_framework.response import Response
from service_user.exports import get_user_instance_with_token_id
from service_application.exports import get_app_instance_with_app_id
from service_application.models import UsingApplicationModel
from utils import log, ParameterKeys


class UninstallAPI(generics.GenericAPIView, mixins.DestroyModelMixin):

    def delete(self, request):
        log(self.delete, params=request.query_params)

        # get user instance
        _ui = get_user_instance_with_token_id(
            user_id=request.query_params.get(ParameterKeys.USER_ID, None),
            token_id=request.query_params.get(ParameterKeys.TOKEN_ID, None)
        )
        if _ui is None:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_USER
            })

        # get application instance
        _ai = get_app_instance_with_app_id(
            app_id=request.query_params.get(ParameterKeys.APPLICATION_ID)
        )
        if _ai is None:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_APPLICATION
            })

        # response
        try:
            _i = UsingApplicationModel.objects.get(
                application_id=_ai.id,
                user_id=_ui.id
            )
        except UsingApplicationModel.DoesNotExist:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_APPLICATION
            })

        self.perform_destroy(_i)

        return Response({
            ParameterKeys.STATUS: ParameterKeys.SUCCESS,
            ParameterKeys.APPLICATION_ID: str(_ai.app_id)
        })
