from django.conf import settings

from rest_framework import status
# from rest_framework.authentication import TokenAuthentication
# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import HistorySerializer

from ..models import History

class HistoryView(APIView):
    # def get(self, request):
    #     data = []

    #     history = History.objects.all()
    #     for i in history:
    #         i_data = {
    #             'id': i.id,
    #             'description': i.description,
    #             'date': i.pub_date,
    #         }

    #         data.append(i_data)

    #     return Response(
    #         data=data,
    #         status=status.HTTP_200_OK
    #     )

    def get(self, request):
        history = History.objects.all()
        serializer = HistorySerializer(history, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    # def post(request, pk):
    #     history= History.objects.get(id=pk)
    #     serializer = HistorySerializer(instance=history, data=request.data)

    #     if serializer.is_valid():
    #         serializer.save()

    #     return Response(serializer.data)