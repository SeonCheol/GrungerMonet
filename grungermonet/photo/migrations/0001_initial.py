# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import photo.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(blank=True, max_length=100, verbose_name='One Line Description')),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('title', models.CharField(max_length=50)),
                ('image', photo.fields.ThumbnailImageField(upload_to='photo/%Y/%m')),
                ('description', models.TextField(blank=True, verbose_name='Photo Description')),
                ('upload_date', models.DateTimeField(verbose_name='Upload Date', auto_now_add=True)),
                ('album', models.ForeignKey(to='photo.Album')),
            ],
            options={
                'ordering': ['title'],
            },
        ),
    ]
