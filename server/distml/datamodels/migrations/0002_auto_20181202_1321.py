# Generated by Django 2.1.1 on 2018-12-02 13:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('datamodels', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobs',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
