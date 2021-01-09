from django.db import models

# Create your models here.
class History(models.Model):
    description = models.TextField(
        blank=False,
        null=False
    )

    def __str__(self):
        return self.description