from django.db import models

# Create your models here.


class Dicom(models.Model):
    label = models.CharField(max_length=50, blank=True, default='')
    is_labeled = models.BooleanField(default=False)
    picture = models.FileField(upload_to='uploads/', max_length=255, default='')
