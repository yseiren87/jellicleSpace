from service_application.models import ApplicationModel, UsingApplicationModel
from django.core.exceptions import ValidationError


def get_app_instance_with_app_id(app_id):
    try:
        instance = ApplicationModel.objects.get(
            app_id__exact=app_id
        )
    except (ApplicationModel.DoesNotExist, ValidationError):
        return None

    return instance


def is_valid_application_with_app_id(app_id):
    return get_app_instance_with_app_id(app_id) is not None


def get_instance_installed_application(app_id, user_id):
    try:
        instance = UsingApplicationModel.objects.get(
            application__app_id__exact=app_id,
            user__user_id__exact=user_id
        )
    except UsingApplicationModel.DoesNotExist:
        return None

    return instance


def is_installed_application(app_id, user_id):
    return get_instance_installed_application(app_id, user_id) is not None
