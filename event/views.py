from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class EventView(TemplateView):
    template_name = 'event/EventList.html'