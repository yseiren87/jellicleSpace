from rest_framework import mixins, generics
from rest_framework.response import Response
from django.http import Http404
from service_user.models import UserModel
from .serializer import ProfileSerializer
from utils import log, ParameterKeys, get_serializer_error_code


class ProfileAPI(generics.GenericAPIView, mixins.RetrieveModelMixin):
    lookup_field = "user_id"

    queryset = UserModel.objects.all()
    serializer_class = ProfileSerializer

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
        _s = self.get_serializer(_i)

        _r = {ParameterKeys.STATUS: ParameterKeys.SUCCESS}
        _r.update(_s.data)

        log(self.get, ret=_r)
        return Response(_r)

    def put(self, request, *args, **kwargs):
        log(self.put, data=request.data)

        try:
            _i = self.get_object()
        except Http404:
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_USER
            })

        # verifying token
        token_id = request.data.get(ParameterKeys.TOKEN_ID, None)
        if token_id is None or token_id != _i.token_id:
            Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_TOKEN
            })

        # response
        _d = request.data
        if _d[ParameterKeys.USERNAME] == _i.username:
            del _d[ParameterKeys.USERNAME]

        _s = self.get_serializer(_i, data=_d, partial=True)

        if _s.is_valid():
            _s.save()

            ret = {ParameterKeys.STATUS: ParameterKeys.SUCCESS}
            ret.update(_s.data)

            log(self.put, data=ret)
            return Response(ret)

        log(self.put, errors=_s.errors)
        return Response({
            ParameterKeys.STATUS: ParameterKeys.INVALID,
            ParameterKeys.CODE: get_serializer_error_code(_s)
        })
