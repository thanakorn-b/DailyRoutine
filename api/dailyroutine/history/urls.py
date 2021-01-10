from django.urls import path

from .views.history import HistoryView
from .views.historyPost import HistoryPostView

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
    )
]