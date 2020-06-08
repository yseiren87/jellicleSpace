from service_user.models import UserModel
from django.core.exceptions import ValidationError


def get_user_instance_with_session_id(user_id, session_id):
    try:
        instance = UserModel.objects.get(
            user_id__exact=user_id,
            session_id__exact=session_id
        )
    except (UserModel.DoesNotExist, ValidationError):
        return None

    return instance


def is_valid_user_with_session_id(user_id, session_id):
    return get_user_instance_with_session_id(user_id, session_id) is not None


def get_user_instance_with_token_id(user_id, token_id):
    try:
        instance = UserModel.objects.get(
            user_id__exact=user_id,
            token_id__exact=token_id
        )
    except (UserModel.DoesNotExist, ValidationError):
        return None

    return instance


def is_valid_user_with_token_id(user_id, token_id):
    return get_user_instance_with_token_id(user_id=user_id, token_id=token_id) is not None

