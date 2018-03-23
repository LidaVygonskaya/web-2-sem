from rest_framework import serializers

from comment.models import Comment
from core.models import User
from event.models import Event
from like.models import Like
from post.models import Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'groups', 'url', 'following', 'id', 'avatar')

class UserSerializerFollowers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'id', 'avatar')

class FollowingsThrough(serializers.ModelSerializer):
    to_user = UserSerializer(read_only=True)
    from_user = UserSerializer(read_only=True)
    class Meta:
        model = User.following.through
        fields = ('id', 'to_user', 'from_user')


#9-post
#10-comment
#ContentType.objects.get_gor_id(10) - comment
class LikeSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')

    class Meta:
        model = Like
        fields = ('author', 'created', 'updated', 'content_type', 'object_id')


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    likes = LikeSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('author', 'created', 'updated', 'text', 'likes','id','likes_count')


class CommentSerializer(serializers.HyperlinkedModelSerializer):

    author = serializers.ReadOnlyField(source='author.id')
    likes_count = serializers.ReadOnlyField()
    post = PostSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('author', 'text', 'created', 'updated', 'likes_count', 'post')


class EventSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')


    class Meta:
        model = Event
        fields = ('author', 'created', 'updated', 'text', 'event_type','id')


