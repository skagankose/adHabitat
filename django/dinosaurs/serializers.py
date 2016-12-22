from dinosaurs.models import Dinosaur, AdGroup, Keyword,Recommendation
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

class RecommendationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recommendation
        fields = ("id", "keyword", "ctr", "cr")
