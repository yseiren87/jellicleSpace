import base64
import hashlib
from datetime import datetime
from uuid import uuid4


class HashUtil:
    @staticmethod
    def get_hash(obj, algorithm=hashlib.sha256):
        return base64.b64encode(algorithm(str(obj).encode()).digest()).hex()

    @staticmethod
    def get_password(plain):
        return HashUtil.get_hash(obj="%s-password" % plain, algorithm=hashlib.sha3_256)

    @staticmethod
    def get_session_id():
        return HashUtil.get_hash(obj="%s%s-session" % (uuid4().hex, datetime.now().strftime("--%Y%m%d-%H%M%S")))

    @staticmethod
    def get_token_id():
        return HashUtil.get_hash(obj="%s%s-token" % (uuid4().hex, datetime.now().strftime("--%Y%m%d-%H%M%S")))
