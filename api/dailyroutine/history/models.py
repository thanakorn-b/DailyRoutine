import datetime

from django.db import models
from django.utils import timezone

# Create your models here.
class History(models.Model):
    description = models.TextField(
        blank=False,
        null=False
    )
    pub_date = models.DateTimeField('date published', default=timezone.now())

    def __str__(self):
        return self.description