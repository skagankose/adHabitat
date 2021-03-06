# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-12-21 13:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dinosaurs', '0004_auto_20161220_1457'),
    ]

    operations = [
        migrations.CreateModel(
            name='Keyword',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('terms', models.TextField()),
                ('ctr', models.FloatField(default=b'0.0')),
                ('cr', models.FloatField(default=b'0.0')),
            ],
        ),
        migrations.AlterField(
            model_name='dinosaur',
            name='adGroups',
            field=models.ManyToManyField(blank=True, null=True, to='dinosaurs.AdGroup'),
        ),
        migrations.AddField(
            model_name='adgroup',
            name='keywords',
            field=models.ManyToManyField(blank=True, null=True, to='dinosaurs.Keyword'),
        ),
    ]
