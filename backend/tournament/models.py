from django.db import models

class Character(models.Model):
    name = models.CharField(max_length=100)
    img = models.URLField()  # Store the image URL

    def __str__(self):
        return self.name
