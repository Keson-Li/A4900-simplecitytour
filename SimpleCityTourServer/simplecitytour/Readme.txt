pip install django
pip install pydub
pip install djangorestframework
pip install djangorestframework-jwt

mkdir SimpleCityTourServer
cd SimpleCityTourServer

django-admin.py startproject simplecitytour .
cd simplecitytour
django-admin.py startapp restapi
cd ..

..........in linux
apt-get install ffmpeg libavcodec-extra-53