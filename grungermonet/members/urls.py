from django.conf.urls import url
from members.models import Member
from members.views import MemberLV, MemberDV

urlpatterns = [
	url(r'^$', MemberLV.as_view(model=Member), name='index'),
	url(r'^(?P<pk>\d+)', MemberDV.as_view(model=Member), name='member_detail'),
]