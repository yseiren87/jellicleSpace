from django.urls import path
from service_application import views

urlpatterns = [
    path("launcher/", views.LauncherAPI.as_view(), name="LauncherAPI"),
    path("install/", views.InstallAPI.as_view(), name="InstallAPI"),
    path("uninstall/", views.UninstallAPI.as_view(), name="UninstallAPI"),
    path("main/", views.MainAPI.as_view(), name="MainAPI"),
    path("<app_id>/info/", views.InfoAPI.as_view(), name="InfoAPI")
]
