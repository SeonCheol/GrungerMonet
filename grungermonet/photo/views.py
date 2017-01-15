from django.shortcuts import render
from photo.models import Album, Photo
from django.views.generic import ListView, DetailView

# Create your views here.

class AlbumLV(ListView):
	model = Album
class AlbumDV(DetailView):
	model = Album

class PhotoDV(DetailView):
	model = Photo