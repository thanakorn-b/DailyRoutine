from django.urls import path

from .views.history import HistoryView

urlpatterns = [
    path(
        '',
        HistoryView.as_view(),
        name='get_all_list'
    ),
]