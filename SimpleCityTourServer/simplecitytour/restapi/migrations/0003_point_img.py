# Generated by Django 2.0.1 on 2018-03-23 00:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0002_location_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='point',
            name='img',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
