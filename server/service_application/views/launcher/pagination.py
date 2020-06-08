from rest_framework.pagination import PageNumberPagination
from utils import ParameterKeys


class LauncherPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = ParameterKeys.SIZE

    def get_paginated_response(self, data):
        return {
            ParameterKeys.APPLICATION_LIST: data,
            ParameterKeys.MORE: self.get_next_link() is not None,
            ParameterKeys.TOTAL_PAGES: self.page.paginator.num_pages
        }
