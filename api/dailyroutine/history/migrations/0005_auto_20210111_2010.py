# Generated by Django 3.1.4 on 2021-01-11 13:10

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('history', '0004_auto_20210111_1955'),
    ]

    operations = [
        migrations.AddField(
            model_name='history',
            name='pub_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 1, 11, 13, 10, 38, 665851, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='history',
            name='time',
            field=models.TextField(default='20:10'),
        ),
    ]