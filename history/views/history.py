from django.conf import settings

from rest_framework import status
# from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import HistorySerializer

from ..models import History

class HistoryView(APIView):
    def get(self, request):
        history = History.objects.all().order_by('-pub_date')
        serializer = HistorySerializer(history, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)