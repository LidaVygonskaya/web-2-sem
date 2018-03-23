from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser, User
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from templated_email import InlineImage
#from event.models import Event


class WatchableModel(models.Model):
    def get_title_for_event(self):
        raise NotImplementedError

    def get_title_for_updated_event(self):
        raise NotImplementedError

    class Meta:
        abstract = True

class User(AbstractUser, WatchableModel):
    # Count of created objects in database
    objects_count = models.IntegerField(default=0)
    following = models.ManyToManyField('self', related_name='follows', symmetrical=False)
    avatar = models.ImageField(upload_to='avatars', blank=True, null=True)

    def send_welcome_letter(self):
        if settings.DEBUG:
            to = [admin[0] for admin in settings.ADMINS]
            # base_send_mail(subject, text, 'noreply@mail.com', to)

            email = EmailMultiAlternatives('Welcome', 'hi', 'noreply@mail.ru', to)

            pic = InlineImage('pic.jpg', open('/home/lida/web_project_2sem/technotrack-web2-spring-2017/core/static/core/download.png','rb').read())
            pic.attach_to_message(email)
            html = render_to_string('email/welcome_letter.html', {'username': self.username, 'SITE_URL': settings.SITE_URL, 'pic': pic})
            email.attach_alternative(html, 'text/html')
            # email.attach('myfile.txt', 'THIS IS MY FILE', 'text/plain')
            email.send()

    #following-we follow
    #follows they follow us
    def send_digest_letter(self):
        to = [admin[0] for admin in settings.ADMINS]
        # base_send_mail(subject, text, 'noreply@mail.com', to)

        email = EmailMultiAlternatives('Welcome', 'hi', 'noreply@mail.ru', to)

        pic = InlineImage('pic.jpg',
                          open('/home/lida/web_project_2sem/technotrack-web2-spring-2017/core/static/core/download.png',
                               'rb').read())
        pic.attach_to_message(email)

        html = render_to_string('email/digest_letter.html',
                                {'username': self.username, 'SITE_URL': settings.SITE_URL, 'pic': pic})

        #for object in User.following.through.objects.filter(from_user=self.id):
          #  events = Event.objects.filter(author_id=object.to_user)


        email.attach_alternative(html, 'text/html')

        # email.attach('myfile.txt', 'THIS IS MY FILE', 'text/plain')
        email.send()



    def get_title_for_event(self):
        return u'User {} follows {}'.format(self.username, self.follows.all().last())


    def __unicode__(self):
        return self.username
#
# through= User relation class
# sdelatt usera watchable


class ModelWithDates(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ModelWithAuthor(models.Model):
    author = models.ForeignKey(User)

    class Meta:
        abstract = True
