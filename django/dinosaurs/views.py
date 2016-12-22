from rest_framework import viewsets
from dinosaurs.serializers import DinosaurSerializer, AdGroupSerializer, KeywordSerializer
from dinosaurs.models import Dinosaur, AdGroup, Keyword
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
import re


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

@api_view(['POST'])
@csrf_exempt
def uploads(request):
    all_data = {}
    if request.method == 'POST':
        data = request.data
        for i in data:
            if i["Campaign"]!= '':
                campaign = i["Campaign"]
                adgroup = i["Ad group"]
                ctr = float(i["CTR"].strip('%'))/100
                conversion = float(i["Click conversion rate"].strip('%'))/100
                keyword = re.sub(r'[^\w\s]','',i['Keyword / Placement'])
                all_data.setdefault(campaign,{'CTR':[],'CR':[],'adgroups':{} })
                all_data[campaign]['CTR'].append(ctr)
                all_data[campaign]['CR'].append(conversion)
                all_data[campaign]['adgroups'].setdefault(adgroup,{'CTR':[],'CR':[],'keywords':{}})
                all_data[campaign]['adgroups'][adgroup]['CTR'].append(ctr)
                all_data[campaign]['adgroups'][adgroup]['CR'].append(conversion)
                all_data[campaign]['adgroups'][adgroup]['keywords'].setdefault(keyword, {'CTR':[],'CR':[]})
                all_data[campaign]['adgroups'][adgroup]['keywords'][keyword]['CTR'].append(ctr)
                all_data[campaign]['adgroups'][adgroup]['keywords'][keyword]['CR'].append(conversion)

        for camp in all_data.keys():
            all_data[camp]['CTR'] = sum(all_data[camp]['CTR']) / len(all_data[camp]['CTR'])
            all_data[camp]['CR'] = sum(all_data[camp]['CR']) / len(all_data[camp]['CR'])
            for adg in all_data[camp]['adgroups']:
                all_data[camp]['adgroups'][adg]['CTR'] = sum(all_data[camp]['adgroups'][adg]['CTR']) / len(all_data[camp]['adgroups'][adg]['CTR'])
                all_data[camp]['adgroups'][adg]['CR'] = sum(all_data[camp]['adgroups'][adg]['CR']) / len(all_data[camp]['adgroups'][adg]['CR'])
                for kw in all_data[camp]['adgroups'][adg]['keywords']:
                    all_data[camp]['adgroups'][adg]['keywords'][kw]['CTR'] = sum(all_data[camp]['adgroups'][adg]['keywords'][kw]['CTR']) / len(all_data[camp]['adgroups'][adg]['keywords'][kw]['CTR'])
                    all_data[camp]['adgroups'][adg]['keywords'][kw]['CR'] = sum(all_data[camp]['adgroups'][adg]['keywords'][kw]['CR']) / len(all_data[camp]['adgroups'][adg]['keywords'][kw]['CR'])

        print all_data
        return Response(status=204)
    return Response(status=204)
