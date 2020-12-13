from django.shortcuts import render
import numpy as np
import pydicom
import base64
import png
import os

# Create your views here.

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import DicomSerializer


@api_view(['POST'])
def save_dicom(request):
    if request.method == 'POST':
        serializer = DicomSerializer()
        serializer.create(validated_data=request.data)
    return Response({"test": "dziala"})


@api_view(['GET'])
def list_dicoms(request):
    if request.method == 'GET':
        serializer = DicomSerializer()
        data = serializer.list_all()
    return Response(data)


# get PNG image: http://127.0.0.1:8000/dicom_annotator/get_image/glowa.dcm
# http://127.0.0.1:8000/dicom_annotator/get_image/breast.dcm
# http://127.0.0.1:8000/dicom_annotator/get_image/FluroWithDisplayShutter.dcm
@api_view(['GET'])
def get_image(request, file):
    ds = pydicom.dcmread(f"./media/uploads/{file}")
    shape = ds.pixel_array.shape
    image_2d = ds.pixel_array.astype(float)
    image_2d_scaled = (np.maximum(image_2d, 0) / image_2d.max()) * 255.0
    image_2d_scaled = np.uint8(image_2d_scaled)

    png_file_name = os.path.splitext(file)[0] + '.png'
    with open(f"media/converted_to_png/{png_file_name}", 'wb') as png_file:
        w = png.Writer(shape[1], shape[0], greyscale=True)
        w.write(png_file, image_2d_scaled)
        ## Create object that contains both dicom file name and png file name for use on the client side
        files = {
            "dicom" : file,
            "png": png_file_name
        }
    return Response(files)


@api_view(['PUT'])
def update_dicom(request, file):
    if request.method == 'PUT':
        serializer = DicomSerializer()
        serializer.update(file=file, validated_data=request.data)

    print(request.data)
    return Response({"update successfull": file})


@api_view(['POST'])
def save_labeled_image(request, file):
    if request.method == 'POST':
        print(file)
        with open(f"media/labeled/{file}", "wb") as labeled_file:
            b64_string = str.encode(request.data.split('base64,')[1])
            labeled_file.write(base64.decodebytes(b64_string))

    return Response({"labeling successfull": file})
