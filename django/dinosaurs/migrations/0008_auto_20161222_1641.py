# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-12-22 16:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dinosaurs', '0007_auto_20161222_1640'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dinosaur',
            name='adGroups',
            field=models.ManyToManyField(blank=True, null=True, to='dinosaurs.AdGroup'),
        ),
    ]