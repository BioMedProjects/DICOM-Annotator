# Generated by Django 3.1.4 on 2020-12-03 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dicom_annotator', '0002_auto_20201203_1305'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dicom',
            name='picture',
            field=models.ImageField(default='media/glowa.dcm', max_length=255, upload_to='uploads/'),
        ),
    ]