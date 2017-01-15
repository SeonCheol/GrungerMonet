from django.conf.urls import url
from board.views import BoardDV, BoardLV, BoardCV, BoardUV, BoardDelete
from board.models import Board
urlpatterns = [
	url(r'^$', BoardLV.as_view(model=Board), name='index'),
	url(r'^(?P<page>\d+)/$', BoardLV.as_view(model=Board), name='index'),
 	#url(r'^(?P<page>\d+)', BoardLV.as_view(model=Board), name='index'),
	url(r'^detail/(?P<pk>\d+)/$', BoardDV.as_view(model=Board), name='board_detail'),
	url(r'^create/$', BoardCV.as_view(model=Board), name='create'),
	url(r'^edit/(?P<pk>[0-9]+)/$', BoardUV.as_view(model=Board), name='edit'),
	url(r'^delete/(?P<pk>[0-9]+)/$', BoardDelete.as_view(model=Board), name='delete'),
]