from celery import shared_task
from models import User
from celery.task import periodic_task
from celery.schedules import crontab

@shared_task
def test(a):
    return a**100

#from signal we take apply_async
@shared_task
def send_welcome_to_user(user_id):
    user = User.objects.get(id=user_id)
    user.send_welcome_letter()

#@periodic_task(run_every=crontab(minute='*'))
#def send_digest():
    #        for user in User.objects.all():
