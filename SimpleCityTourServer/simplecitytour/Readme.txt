pip install django
pip install djangorestframework
pip install djangorestframework-jwt

mkdir SimpleCityTourServer
cd SimpleCityTourServer

django-admin.py startproject simplecitytour .
cd simplecitytour
django-admin.py startapp restapi
cd ..

