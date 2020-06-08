from web_main.wrappers import SignWrapper


class JoinPage(SignWrapper):
    def __init__(self):
        super().__init__(template="sign.html")
