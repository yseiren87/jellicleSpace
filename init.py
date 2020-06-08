import sys
import os


def alert(target=None):
    inst = {
        "startapp": {
            "args": ["basePath", "name"],
            "description": "making django app"
        }
    }

    def _ms(_k, _v, _d=True):
        _a = ""
        for _t in _v["args"]:
            _a += " [%s]" % _t

        if _d is True:
            return "%s %s : %s" % (_k, _a[1:], _v["description"])
        else:
            return "%s %s" % (_k, _a[1:])

    t = ""
    if target is None:
        for _o in inst.keys():
            t += "%s\n" % _ms(_o, inst[_o])

        t = t[: len(t) - 1]
        print(t)

    else:
        t = "%s" % _ms(target, inst[target], _d=False)

    return t


instruction = ""
try:
    instruction = sys.argv[1]
except IndexError:
    alert()
    exit(1)

if instruction == "startapp":
    if len(sys.argv) != 4:
        print("'startapp' needs 2 arguments : %s" % alert(target="startapp"))
        exit(1)

    base_path = sys.argv[2]
    name = sys.argv[3]
    app_path = os.path.join(base_path, name)

    if os.path.exists(app_path):
        print("'%s' exist already ..." % name)
        exit(1)

    os.makedirs(app_path)

    with open(os.path.join(app_path, "__init__.py"), "w") as init_py:
        pass

    with open(os.path.join(app_path, "apps.py"), "w") as apps_py:
        _t = ""
        for i in [i.capitalize() for i in name.split("_")]:
            _t += i

        apps_py.write("from django.apps import AppConfig\n\n\nclass %sConfig(AppConfig):\n\tname = \"%s\"\n" % (
            _t, name))

    with open(os.path.join(app_path, "tests.py"), "w") as tests_py:
        tests_py.write("from django.test import TestCase\n")

    with open (os.path.join(app_path, "urls.py"), "w") as urls_py:
        urls_py.write("urlpatterns = []\n")

    dirs = ["migrations", "models", "views", "admin"]
    for item in dirs:
        f_path = os.path.join(app_path, item)
        os.makedirs(f_path)

        with open(os.path.join(f_path, "__init__.py"), "w") as s_init_py:
            pass

else:
    print("'%s' instruction not found ...\n" % instruction)
    alert()
    exit(1)
