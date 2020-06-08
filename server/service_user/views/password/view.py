from rest_framework import mixins, generics
from rest_framework.response import Response
from django.http import Http404
from service_user.models import UserModel
from .serializer import PasswordSerializer
from utils import log, ParameterKeys, get_serializer_error_code


class PasswordAPI(generics.GenericAPIView, mixins.UpdateModelMixin):
    lookup_field = "user_id"

    queryset = UserModel.objects.all()
    serializer_class = PasswordSerializer

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
        serializer = self.get_serializer(_i, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            ret = {ParameterKeys.STATUS: ParameterKeys.SUCCESS}
            log(self.put, data=ret)
            return Response(ret)

        log(self.put, errors=serializer.errors)
        return Response({
            ParameterKeys.STATUS: ParameterKeys.INVALID,
            ParameterKeys.CODE: get_serializer_error_code(serializer)
        })
