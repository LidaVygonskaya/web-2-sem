# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-09-14 20:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='edited_count',
            field=models.IntegerField(default=0),
        ),
    ]