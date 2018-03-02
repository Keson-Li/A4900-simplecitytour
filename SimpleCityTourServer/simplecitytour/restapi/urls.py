"""simplecitytour URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import include
from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
# from .views import Tour_cities
from . import views

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('logout/', refresh_jwt_token),
    # path('get-locations/', Tour_cities.as_view(), name='getcities'),
    # path('sign/', Signup.as_view(), name='sign'),
    # path('test/', views.index, name='index'),
    path('testapi/', views.test_resp, name='testresp'),
    path('signup/', views.signup_user, name='login'),
    path('accounts/', include('django.contrib.auth.urls')),
]