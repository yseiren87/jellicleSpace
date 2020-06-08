from utils import PageAdapter
from web_main import views
from .constants import PageList

adapter = PageAdapter(views, PageList)

urlpatterns = adapter.url_patterns
