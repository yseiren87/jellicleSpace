from django.shortcuts import redirect
from utils import ParameterKeys
from web_main.constants import PageList


def logout_page(request):
    response = redirect(PageList.LOGIN.url)

    response.delete_cookie(ParameterKeys.USER_ID, path="/")
    response.delete_cookie(ParameterKeys.SESSION_ID, path="/")

    return response
