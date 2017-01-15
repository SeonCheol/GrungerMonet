# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True)),
                ('title', models.CharField(max_length=20)),
                ('date', models.DateTimeField()),
                ('desc', models.CharField(max_length=20)),
                ('content', models.TextField()),
                ('modify_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'board',
                'ordering': ('-id',),
            },
        ),
    ]
