from django.shortcuts import render
from members.models import Member
from django.views.generic import ListView, DetailView

# Create your views here.
#-- ListView
class MemberLV(ListView):
	model = Member

#-- DetailView
class MemberDV(DetailView):
	model = Member