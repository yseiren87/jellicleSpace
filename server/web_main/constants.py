from utils import PageListABC, Page


class PageList(PageListABC):
    LAUNCHER = Page("Index", "", view_name="LauncherPage")

    LOGIN = Page("Login", "login/", view_name="LoginPage", subtitle="Login")

    JOIN = Page("Join", "join/", view_name="JoinPage", subtitle="Join")

    PROFILE = Page("Profile", "user/profile/", view_name="ProfilePage", subtitle="Profile")

    PASSWORD = Page("Password", "user/password/", view_name="PasswordPage", subtitle="Password")

    APPLICATION = Page("Application", "application/", view_name="ApplicationPage", subtitle="Application")

    APPLICATION_DETAIL = Page("ApplicationDetail", "application/<app_id>/", view_name="ApplicationDetailPage")

    LOGOUT = Page("Logout", "user/logout/", view_name="logout_page")
