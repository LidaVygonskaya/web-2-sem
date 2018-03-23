from django.core.mail import send_mail as base_send_mail, mail_admins
from django.conf import settings
from django.http import request
from templated_email import InlineImage
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from models import User

def send_mail_welcome(username, subject, text):
    if settings.DEBUG:
        to = [admin[0] for admin in settings.ADMINS]
    #base_send_mail(subject, text, 'noreply@mail.com', to)

        email = EmailMultiAlternatives(subject, text, 'noreply@mail.ru', to)

        #pic = InlineImage('hat.jpg', open('','rb').read())
        #pic.attach_to_message(email)
        html = render_to_string('email/welcome_letter.html', {'username': username})
        email.attach_alternative(html, 'text/html')
        #email.attach('myfile.txt', 'THIS IS MY FILE', 'text/plain')
        email.send()


def send_mail_digest(username, subject, text, html, to):
    if settings.DEBUG:
        to = [admin[0] for admin in settings.ADMINS]
    #base_send_mail(subject, text, 'noreply@mail.com', to)

        email = EmailMultiAlternatives(subject, text, 'noreply@mail.ru', to)

        #pic = InlineImage('hat.jpg', open('','rb').read())
        #pic.attach_to_message(email)
        html = render_to_string('email/digest_letter.html', {'username': username})
        email.attach_alternative(html, 'text/html')
        #email.attach('myfile.txt', 'THIS IS MY FILE', 'text/plain')
        email.send()