# Generated by Django 2.1.1 on 2018-12-03 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('datamodels', '0002_auto_20181202_1321'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobs',
            name='summarized',
            field=models.BooleanField(default=False),
        ),
    ]
