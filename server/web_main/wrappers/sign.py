from django.shortcuts import render, redirect
from utils import ParameterKeys
from .main import MainWrapper


class SignWrapper(MainWrapper):
    def _page(self):
        self.user = self._get_user_instance()
        if self.user is not None:
            print(self._get_landing_url_from_url())

            return redirect(self._get_landing_url_from_url())

        self._update_landing_url_context()
        self._update_subtitle_context()

        res = render(self.request, self.template, context=self.context)
        res.delete_cookie(ParameterKeys.USER_ID, path="/")
        res.delete_cookie(ParameterKeys.SESSION_ID, path="/")

        return res
