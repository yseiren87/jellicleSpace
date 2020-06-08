from web_main.wrappers import MainWrapper


class ProfilePage(MainWrapper):
    def __init__(self):
        super().__init__(template="main.html")
