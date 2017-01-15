from django.shortcuts import render
from board.models import Board
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy

# Create your views here.

class BoardLV(ListView):
	model = Board

class BoardDV(DetailView):
	model = Board

class BoardCV(CreateView):
	model = Board
	fields = ['title',  'desc', 'content']
	success_url = reverse_lazy('board:index')

class BoardUV(UpdateView):
	model = Board
	fields = ['title',  'desc', 'content']
	success_url = reverse_lazy('board:index')

class BoardDelete(DeleteView):
	smodel = Board
	fields = ['title',  'desc', 'content']
	success_url = reverse_lazy('board:index')
