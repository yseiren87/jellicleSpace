from django.urls import path


class Page:
    def __init__(self, name, url, view_name, subtitle=None):
        self.NAME = name
        self.URL = url
        self.SUBTITLE = subtitle
        self.VIEW_NAME = view_name

    def __eq__(self, other):
        if type(other) == str:
            return self.URL in other

        return super().__eq__(other)

    def __ne__(self, other):
        if type(other) == str:
            return self.URL not in other

        return super().__ne__(other)

    def __str__(self):
        return "%s (%s) - %s" % (self.NAME, self.URL, self.SUBTITLE)

    def get_url_name(self, index=0):
        url_split = [f for f in self.URL.split("/") if f != ""]

        if len(url_split) == 0:
            return ""

        try:
            return url_split[index]
        except ValueError:
            return None

    @property
    def url(self):
        return "/%s" % self.URL


class PageListABC:
    @classmethod
    def find_by_path_info(cls, path_info):
        _r = path_info[1: len(path_info)]
        _t = None

        for key in cls.__dict__.keys():
            _i = cls.__dict__[key]

            if type(_i) == Page and _i.URL == _r:
                _t = _i
                break

        return _t


class PageAdapter:
    def __init__(self, views, page_list):
        self.VIEWS = views
        self.PAGE_LIST = page_list

    @property
    def url_patterns(self):

        def __g_p(__i):
            __v = self.VIEWS.__dict__[__i.VIEW_NAME]

            if isinstance(__v, type):
                __v_f = __v().page

            else:
                __v_f = __v

            return path(__i.URL, __v_f, name=__i.NAME)

        _t = []
        for key in self.PAGE_LIST.__dict__.keys():
            _i = self.PAGE_LIST.__dict__[key]
            if type(_i) != Page:
                continue

            _t.append(_i)
        # _t.sort(key=lambda x: x.ORDER)

        _u_p_a = []
        for _i_t in _t:
            _u_p = __g_p(_i_t)
            if _u_p is not None:
                _u_p_a.append(_u_p)

        return _u_p_a
