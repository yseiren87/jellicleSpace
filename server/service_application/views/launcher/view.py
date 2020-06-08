from rest_framework import mixins, generics
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .pagination import LauncherPagination
from .serializer import LauncherSerializer
from service_application.models import ApplicationModel
from service_user.exports import is_valid_user_with_token_id
from utils import log, ParameterKeys


class LauncherAPI(generics.GenericAPIView, mixins.ListModelMixin):
    pagination_class = LauncherPagination
    serializer_class = LauncherSerializer
    queryset = ApplicationModel.objects.order_by("-publish_date").filter(public_option=True)

    def get_serializer_context(self):
        context = super().get_serializer_context()

        context.update({
            ParameterKeys.USER_ID: self.request.query_params.get(ParameterKeys.USER_ID, None)
        })

        return context

    def get(self, request):
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
        try:
            _p = self.paginate_queryset(self.filter_queryset(self.get_queryset()))
            _s = self.get_serializer(_p, many=True)
            _d = self.get_paginated_response(_s.data)
        except (NotFound, TypeError):
            return Response({
                ParameterKeys.STATUS: ParameterKeys.INVALID,
                ParameterKeys.CODE: ParameterKeys.INVALID_PAGE
            })

        _r = {ParameterKeys.STATUS: ParameterKeys.SUCCESS}
        _r.update(_d)

        log(self.get, data=_r)
        return Response(_r)
