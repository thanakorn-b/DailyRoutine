from django.urls import path

from .views.history import HistoryView
from .views.historyPost import HistoryPostView
from .views.historyCreate import HistoryCreateView
from .views.historyDelete import HistoryDeleteView

urlpatterns = [
    path(
        '',
        HistoryView.as_view(),
        name='get_all_list'
    ),
    path(
        'historyUpdate/<int:history_id>/',
        HistoryPostView.as_view(),
        name='history-update'
    ),
    path(
        'historyCreate/',
        HistoryCreateView.as_view(),
        name='history-create'
    ),
    path(
        'historyDelete/<int:history_id>/',
        HistoryDeleteView.as_view(),
        name='history-delete'
    ),
]