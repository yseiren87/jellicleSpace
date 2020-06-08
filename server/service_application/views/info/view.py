from rest_framework import mixins, generics
from rest_framework.response import Response
from django.http import Http404
from .serializer import InfoSerializer
from service_application.models import ApplicationModel
from service_user.exports import is_valid_user_with_token_id
from utils import log, ParameterKeys


class InfoAPI(generics.GenericAPIView, mixins.RetrieveModelMixin):
    lookup_field = "app_id"
    serializer_class = InfoSerializer
    queryset = ApplicationModel.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()

        context.update({
            ParameterKeys.USER_ID: self.request.query_params.get(ParameterKeys.USER_ID, None)
        })

        return context

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

        # getting application object
        try:
            _i = self.get_object()
        except Http404:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_APPLICATION
            })

        # response
        _s = self.get_serializer(_i)

        _r = {ParameterKeys.STATUS: ParameterKeys.SUCCESS}
        _r.update(_s.data)

        log(self.get, ret=_r)
        return Response(_r)
