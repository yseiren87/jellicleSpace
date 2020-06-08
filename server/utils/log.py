from django.conf import settings
import types


def log(method, **kwargs):
    assert isinstance(method, types.FunctionType) is True or isinstance(
        method, types.MethodType), "method == type : function or method"

    if settings.DEBUG is True:
        comment = ""
        for key, value in kwargs.items():
            comment += "\t%s : %s\n" % (key, value)

        print(method.__qualname__, "= {")
        print(comment[: len(comment) - 1])
        print("}")


class LogUtil:

    @staticmethod
    def red(plain):
        print("%s%s%s" % ("\033[91m", plain, "\033[0m"))
