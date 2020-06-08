from django.urls import path

from service_user import views

urlpatterns = [
    path("login/", views.LoginAPI.as_view(), name="LoginAPI"),
    path("join/", views.JoinAPI.as_view(), name="JoinAPI"),
    path("verifying/username/", views.VerifyingUsernameAPI.as_view(), name="VerifyingUsernameAPI"),
    path("<user_id>/profile/", views.ProfileAPI.as_view(), name="ProfileAPI"),
    path("<user_id>/password/", views.PasswordAPI.as_view(), name="PasswordAPI"),
    path("<user_id>/exit/", views.ExitAPI.as_view(), name="ExitAPI"),
    path("<user_id>/application/", views.UsingApplicationAPI.as_view(), name="UsingApplicationAPI")
]
