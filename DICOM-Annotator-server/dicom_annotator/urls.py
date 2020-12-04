from django.urls import path
from .views import save_dicom, list_dicoms, get_image

urlpatterns = [
    path('save_dicom/', save_dicom),
    path('list_dicoms/', list_dicoms),

    path('get_image/<str:file>', get_image)
]