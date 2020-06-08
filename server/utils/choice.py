from .log import LogUtil


class Choice:
    def __init__(self, key, verbose):
        self.key = key
        self.verbose = verbose


class ChoiceUtil:

    @classmethod
    def get_choice(cls):
        choice = []

        for _k in cls.__dict__.keys():
            if not _k.startswith("__") and not _k.endswith("__"):
                _v = cls.__dict__[_k]

                if type(_v) != Choice:
                    LogUtil.red("Check a '%s' class. elements must be 'Choice' type ..." % cls.__name__)
                    return None

                choice.append((_v.key, _v.verbose))

        return choice
