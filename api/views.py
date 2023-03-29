from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .credetials import *
from geopy.geocoders import Nominatim

# Create your views here.

class WeatherView(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        loc = request.GET.get('city','Rubavu')
        geolocator = Nominatim(user_agent="my_request")
        
        #applying geocode method to get the location
        location = geolocator.geocode(loc)
        lat = location.latitude
        long = location.longitude
        res = requests.get(f'{REACT_APP_API_URL}/weather/?lat={lat}&lon={long}&units=metric&APPID={REACT_APP_API_KEY}').json()
        icon = res.get('weather')[0].get('icon')
        iUrl = f'{icon}@2x.png'

        weather = {
            'city':location.address.split(',')[0],
            'description':res.get('weather')[0].get('description'),
            'main':res.get('main'),
            'icon':REACT_APP_ICON_URL+iUrl
        }

        return Response(weather, status=status.HTTP_200_OK);
