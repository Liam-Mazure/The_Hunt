# Generated by Django 5.2 on 2025-06-12 22:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hunts', '0007_hunt_author_hunt_created_at'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hunt',
            name='author',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='hunt', to='users.user'),
        ),
    ]
