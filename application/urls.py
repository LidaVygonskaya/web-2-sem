"""application URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings




from django.conf.urls import url, include
from django.template.context_processors import static

from rest_framework import routers
from core import views as vs
from core.views import BaseView
from event.views import EventView
from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register(r'users', vs.UserViewSet)
router.register(r'me', vs.SelfUser)
router.register(r'posts', vs.PostViewSet)
router.register(r'myPage', vs.MyPostsViewSet)
router.register(r'comments', vs.CommentViewSet)
router.register(r'likes', vs.LikeViewSet)
router.register(r'events', vs.EventViewSet)
router.register(r'followers', vs.FollowersSetView)
router.register(r'followings', vs.FollowingsSetView)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^app/v1/', include(router.urls)),
    url(r'^api-token-auth/', views.obtain_auth_token),
    #url(r'^api-auth/',include('rest_framework.urls', namespace='rest_framework')),
    url(r'^social/', include('social_django.urls', namespace='social')),
    url(r'^$', BaseView.as_view(), name='home'),


]




if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]
    from django.conf.urls.static import static

    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)