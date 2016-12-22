from django.db import models

class Keyword(models.Model):
    terms = models.TextField()
    ctr = models.FloatField(default="0.0")
    cr = models.FloatField(default="0.0")

    def __str__(self):
        return self.terms

class AdGroup(models.Model):
    title = models.TextField()
    ctr = models.FloatField(default="0.0")
    cr = models.FloatField(default="0.0")
    keywords = models.ManyToManyField(Keyword, blank=True, null=True)
    # creatives = models.ForeignKey(creative)

    def __str__(self):
        return self.title

class Dinosaur(models.Model):
    species = models.TextField()
    campaing = models.TextField(default="N/A")
    avg_ctr = models.FloatField(default="0.0")
    avg_cr = models.FloatField(default="0.0")
    adGroups = models.ManyToManyField(AdGroup, blank=True, null=True)
