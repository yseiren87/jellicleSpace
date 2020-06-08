from rest_framework import mixins, generics
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .serializer import MainSerializer
from service_application.models import UsingApplicationModel
from service_user.exports import is_valid_user_with_token_id
from utils import log, ParameterKeys


class MainAPI(generics.GenericAPIView, mixins.RetrieveModelMixin):
    serializer_class = MainSerializer

    def get_queryset(self):
        return UsingApplicationModel.objects.filter(
            user__user_id__exact=self.request.query_params.get(ParameterKeys.USER_ID, None)
        )

    def get(self, request, *args, **kwargs):
        log(self.get, params=request.query_params)

        # validating user
        _uc = is_valid_user_with_token_id(
            user_id=request.query_params.get(ParameterKeys.USER_ID, None),
            token_id=request.query_params.get(ParameterKeys.TOKEN_ID, None)
        )

        if not _uc:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_USER
            })

        # response
        _q = self.filter_queryset(self.get_queryset())
        _s = self.get_serializer(_q, many=True)

        _r = {
            ParameterKeys.STATUS: ParameterKeys.SUCCESS,
            ParameterKeys.APPLICATION_LIST: _s.data
        }

        log(self.get, ret=_r)
        return Response(_r)
