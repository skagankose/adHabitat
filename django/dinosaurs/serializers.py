from dinosaurs.models import Dinosaur, AdGroup, Keyword
from rest_framework import serializers


class DinosaurSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dinosaur
        fields = ('species', 'campaing', 'avg_ctr', 'avg_cr', 'adGroups')

class AdGroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AdGroup
        fields = ('title', 'ctr', 'cr', 'keywords')

class KeywordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Keyword
        fields = ('terms', 'ctr', 'cr')
