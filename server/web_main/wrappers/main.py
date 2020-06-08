from django.shortcuts import render, redirect
# from django.conf import settings
from utils import ParameterKeys, log
from service_user.exports import get_user_instance_with_session_id
from web_main.constants import PageList
# from service_application.utils import get_app_instance
import json
from urllib.parse import urlencode


class MainWrapper:
    context = {}

    template = None
    request = None

    user = None

    def __init__(self, template, context=None):
        self.template = template

        if context is not None and type(context) == dict:
            self.context.update(context)

    def page(self, request, **kwargs):
        self.request = request
        return self._page()

    # Protected Functions
    def _page(self):
        self.user = self._get_user_instance()
        if self.user is None:
            param = {
                ParameterKeys.LANDING_URL: self.request.path,
                ParameterKeys.LANDING_PARAM: json.dumps(self.request.GET.dict())
            }
            return redirect("%s?%s" % (PageList.LOGIN.URL, urlencode(param, encoding="UTF-8")))

        # update context
        self._update_session_context()
        self._update_subtitle_context()

        return render(self.request, self.template, context=self.context)

    #
    def _get_user_instance(self):
        user_id = self.request.COOKIES.get(ParameterKeys.USER_ID, None)
        session_id = self.request.COOKIES.get(ParameterKeys.SESSION_ID, None)

        log(self.page, session={ParameterKeys.USER_ID: user_id, ParameterKeys.SESSION_ID: session_id})

        return get_user_instance_with_session_id(user_id=user_id, session_id=session_id)

    #
    def _update_session_context(self):
        self.context.update({
            ParameterKeys.USER_INFO: {
                ParameterKeys.USER_ID: str(self.user.user_id),
                ParameterKeys.TOKEN_ID: self.user.token_id,
            }
        })

    def _update_subtitle_context(self):
        _P = PageList.find_by_path_info(self.request.path_info)
        if _P is not None and _P.SUBTITLE is not None:
            self.context.update({ParameterKeys.SUBTITLE: _P.SUBTITLE})

    # def _update_target_app_context(self):
    #
    #     if PageList.APPLICATION.URL in self.request.path_info:
    #         app_id = self.request.GET.get(ParameterKeys.APPLICATION_ID, None)
    #
    #         app_instance = get_app_instance(app_id)
    #         if app_instance is not None:
    #             self.context.update({
    #                 ParameterKeys.TARGET: {
    #                     ParameterKeys.APPLICATION_ID: str(app_instance.app_id),
    #                     ParameterKeys.URL: app_instance.url
    #                 }
    #             })

    def _update_landing_url_context(self):
        _u = self._get_landing_url_from_url()

        self.context.update({ParameterKeys.LANDING_URL: _u})

    def _get_landing_url_from_url(self, url=None):
        _lu = self.request.GET.get(ParameterKeys.LANDING_URL, "/") if url is None else url
        _lp = self.request.GET.get(ParameterKeys.LANDING_PARAM, "{}")

        if _lp == "{}":
            return _lu

        return "%s?%s" % (_lu, urlencode(json.loads(_lp), encoding="UTF-8"))
