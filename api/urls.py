from django.urls import path,include
from .views import *

urlpatterns = [
    path('',WeatherView.as_view()),
]