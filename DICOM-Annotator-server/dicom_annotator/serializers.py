from rest_framework import serializers
from .models import Dicom


class DicomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dicom
        fields = [
            'label',
            'is_labeled',
            'picture'
        ]

    def create(self, validated_data):
        dicom_object = Dicom(
            label=validated_data['label'],
            is_labeled=validated_data['is_labeled'],
            picture=validated_data['picture']
        )
        dicom_object.save()
        return validated_data

    def list_all(self):
        data = [{
            "label": obj.label,
            "is_labeled": obj.is_labeled,
            "picture": obj.picture.url
        } for obj in Dicom.objects.all()]
        return data

    def update(self, file, validated_data):
        print(file)
        obj_to_update = Dicom.objects.get(picture=file)

        print(obj_to_update)

        obj_to_update = Dicom(
            label=validated_data['label'],
            is_labeled=validated_data['is_labeled'],
            picture=file
        )
        obj_to_update.save()
        return validated_data