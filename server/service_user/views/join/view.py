from rest_framework import mixins, generics, status
from rest_framework.response import Response
from .serializer import JoinSerializer
from utils import log, ParameterKeys, get_serializer_error_code


class JoinAPI(generics.GenericAPIView, mixins.CreateModelMixin):
    serializer_class = JoinSerializer

    def post(self, request):
        log(self.post, content_type=request.content_type, type=type(request.data), data=request.data)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            ret = {ParameterKeys.STATUS: ParameterKeys.SUCCESS}
            ret.update(serializer.data)

            log(self.post, data=ret)
            return Response(ret, status=status.HTTP_201_CREATED)

        log(self.post, errors=serializer.errors)
        return Response({
            ParameterKeys.STATUS: ParameterKeys.INVALID,
            ParameterKeys.CODE: get_serializer_error_code(serializer)
        })
