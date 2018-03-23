from __future__ import unicode_literals

from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = 'core'
    verbose_name = 'Twitter'

    #when everything is ready and all models are imported django do this function
    #it can be different Python code
    def ready(self):
        import signals
        import like.signals