from rest_framework import viewsets
from dinosaurs.serializers import DinosaurSerializer, AdGroupSerializer, KeywordSerializer
from dinosaurs.models import Dinosaur, AdGroup, Keyword


class DinosaurViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Dinosaur.objects.all()
    serializer_class = DinosaurSerializer

class AdGroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = AdGroup.objects.all()
    serializer_class = AdGroupSerializer

class KeywordViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Keyword.objects.all()
    serializer_class = KeywordSerializer
