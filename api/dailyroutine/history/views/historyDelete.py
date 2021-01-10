from django.conf import settings

from rest_framework import status
# from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import HistorySerializer

from ..models import History


class HistoryDeleteView(APIView):
    def delete(self, request, *arg, **kwargs):
        history_id = self.kwargs.get('history_id', 0)
        history = History.objects.get(id=history_id)
        history.delete()

        return Response('Deleted!')