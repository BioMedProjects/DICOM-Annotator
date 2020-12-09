from django.urls import path
from .views import save_dicom, list_dicoms, get_image, update_dicom

urlpatterns = [
    path('save_dicom/', save_dicom),
    path('list_dicoms/', list_dicoms),
    path('update_dicom/<str:file>', update_dicom),

    path('get_image/<str:file>', get_image)
]