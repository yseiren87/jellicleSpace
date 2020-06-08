from rest_framework import mixins, generics
from rest_framework.response import Response
from django.http import Http404
from service_user.models import UserModel
# from .serializer import UsingApplicationSerializer
from utils import log, ParameterKeys


class UsingApplicationAPI(generics.GenericAPIView, mixins.RetrieveModelMixin):
    lookup_field = "user_id"
    queryset = UserModel.objects.all()

    # serializer_class =

    def get(self, request, *args, **kwargs):
        log(self.get, params=request.query_params)

        # getting user object
        try:
            _i = self.get_object()
        except Http404:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_USER
            })

        # verifying token
        token_id = request.query_params.get(ParameterKeys.TOKEN_ID, None)
        if token_id is None or token_id != _i.token_id:
            Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_TOKEN
            })

        # response
        return Response({
            ParameterKeys.STATUS: ParameterKeys.SUCCESS,
            ParameterKeys.APPLICATION_LIST: []
        })
