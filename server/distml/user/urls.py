#user requests URL are handled here

from django.conf.urls import url
from user import views

urlpatterns = [
	url(r'^user/login/$', views.login),	
	url(r'^user/register/$', views.register),	
	url(r'^user/check_username_available/$', views.check_username_available),
	url(r'^user/test_upload/$', views.test_upload),
]