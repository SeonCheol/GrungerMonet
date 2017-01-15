from django.conf.urls import include, url
from django.contrib import admin
from grungermonet.views import HomeView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
	
	url(r'^$', HomeView.as_view(), name='home'),
	url(r'^admin/', admin.site.urls),
	url(r'^members/', include('members.urls', namespace='members')),
	url(r'^board/', include('board.urls', namespace='board')),
	url(r'^photo/', include('photo.urls', namespace='photo')),

	# url(r'^members/$', MemberLV.as_view(model=Member), name='member_idx'),
	# url(r'^members/(?P<pk>\d+)', MemberDV.as_view(model=Member), name='member_detail'),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
