from django.db import models


class Dinosaur(models.Model):
    species = models.TextField()
    campaing = models.TextField(default="N/A")
    avg_ctr = models.FloatField(default="0.0")
    avg_cr = models.FloatField(default="0.0")
