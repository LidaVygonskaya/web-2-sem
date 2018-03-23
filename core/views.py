from django.contrib.contenttypes.models import ContentType
from django.shortcuts import render

# Create your views here.
from django.views import View
from django.views.generic import ListView
from django.views.generic import TemplateView
from rest_framework import permissions

from comment.models import Comment
from core.models import User
from rest_framework import viewsets

from core.permissions import IsOwnerOrReadOnly, IsFollowingOrNot
from core.serializers import UserSerializer, CommentSerializer, PostSerializer, LikeSerializer, EventSerializer, \
    FollowingsThrough, UserSerializerFollowers
from event.models import Event
from like.models import Like
from post.models import Post


class BaseView(TemplateView):
    template_name = 'core/base.html'


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        qs = super(UserViewSet, self).get_queryset()
        if self.request.query_params.get('username'):
            return User.objects.filter(username=self.request.query_params.get('username'))
        else:
            return qs

class SelfUser(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        qs = super(SelfUser, self).get_queryset()
        return User.objects.filter(id=self.request.user.id)




class FollowersSetView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializerFollowers
    http_method_names = ['get', 'head']

    def get_queryset(self):
        user = self.request.user
        return user.following.all()

#to_user is the following
class FollowingsSetView(viewsets.ModelViewSet):

    queryset = User.following.through.objects.all()
    serializer_class = FollowingsThrough

    def get_queryset(self):
        qs = super(FollowingsSetView, self).get_queryset()
        user = self.request.user
        qs = qs.filter(from_user=user.id)
        return qs

class MyPostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created')
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        qs = super(MyPostsViewSet, self).get_queryset()
        qs = qs.filter(author__id = self.request.user.id)
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        qs = super(PostViewSet, self).get_queryset()
        if self.request.query_params.get('username'):
            qs = qs.filter(author__username=self.request.query_params.get('username'))
        if self.request.query_params.get('likes'):
            qs = qs.values(self, '')
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)



class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)


    def get_queryset(self):
        qs = super(CommentViewSet, self).get_queryset()
        #Comments of user
        if self.request.query_params.get('username'):
            qs = qs.filter(author__username=self.request.query_params.get('username'))
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-created')
    serializer_class = EventSerializer
    http_method_names = ['get', 'head']



    def get_queryset(self):
        if self.request.query_params.get('username'):
            user = User.objects.get(username=self.request.query_params.get('username'))
            return Event.objects.all().filter(author__in=user.follows.all()).order_by('-created')
        else:
            user = self.request.user
            return Event.objects.all().filter(author__in=user.follows.all()).order_by('-created')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)



class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

