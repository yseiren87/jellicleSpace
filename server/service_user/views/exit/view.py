from rest_framework import mixins, generics
from rest_framework.response import Response
from django.http import Http404
from service_user.models import UserModel
from service_user.constants import UserStatus
from .serializer import ExitSerializer
from utils import log, ParameterKeys, get_serializer_error_code
from datetime import datetime


class ExitAPI(generics.GenericAPIView, mixins.DestroyModelMixin):
    lookup_field = "user_id"

    queryset = UserModel.objects.all()
    serializer_class = ExitSerializer

    def delete(self, request, *args, **kwargs):
        log(self.delete, data=request.query_params)

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
        serializer = self.get_serializer(_i, data={
            "password": "@@%d" % _i.id,
            "email": "none@none.none",
            "status": UserStatus.EXIT.key,
            "exit_date": datetime.now()
        }, partial=True)

        if serializer.is_valid():
            serializer.save()

            ret = {ParameterKeys.STATUS: ParameterKeys.SUCCESS}

            log(self.delete, data=ret)
            return Response(ret)

        log(self.delete, errors=serializer.errors)
        return Response({
            ParameterKeys.STATUS: ParameterKeys.INVALID,
            ParameterKeys.CODE: get_serializer_error_code(serializer)
        })
