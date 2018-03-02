
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission
from rest_framework import generics, permissions, mixins

from .models import Polygon, LandingPage, Location, PointType, Point, Tourist, UserPayment, AdminActiveTime
from .serializers import UserSerializer, PolygonSerializer, LandingPageSerializer, LocationSerializer,PointTypeSerializer, PointSerializer, TouristSerializer, UserPaymentSerializer,AdminActiveTimeSerializer

from .permission import IsOwnerOrReadOnly
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from django.db.models import Q
from django.contrib.auth import get_user_model

from rest_framework_jwt.settings import api_settings

from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from django.db import transaction
import json
# from sets import Set


@api_view(['GET', 'POST'])
def test_resp(request, format=None):
    if request.method == 'GET':
        print(User.objects.get(email = 'kvmmvv@gmail.com').username)
        return Response({'hello':'apiview'})
    elif request.method == 'POST':
        print('the request data is: ')
        print(request.data)

        return Response(request.data)
    return

@api_view(['POST'])
@permission_classes((permissions.AllowAny, ))
def signup_user(request):
    print("get request")
    if request.method == 'POST':

        #allow only letters, numbers, dash or underscore in username 
        allowed_chars = set('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-')

        #verify username and password, delete trailing whitespaces
        if len(request.data['username'].rstrip()) <5 or len(request.data['password'].rstrip())<6 or not set(request.data['username'].rstrip()).issubset(allowed_chars) :
            return Response({'faild':'invaild_username_or_password'})

        try:
            with transaction.atomic():
                new_user = User(username=request.data['username'].rstrip(), email=request.data['email'].rstrip())
                new_user.set_password(request.data['password'].rstrip())
                new_user.save()
        except Exception as ex:

            if ex.args[0] == 'UNIQUE constraint failed: auth_user.username':
                print('User: '+request.data['username'].rstrip()+ 'attemp to register an existing username')
                return Response({'failed':'username existed'})

            return Response({'failed':'unknown'})

        print('User: '+request.data['username']+ 'signup successfully.')
        return Response({'succeed':'created'})  

    return Response({'failed':'unknown'})


@api_view(['POST'])
def logout_user(request):
    
    if request.method == 'POST':
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        

        # print(request.data['username'])
        print(User.objects.all())
        # username = request.POST['username']
        # password = request.POST['password']
        # user     = authenticate(request, username=username, password = password)
        # if user is not None:
            # login(request, user)
            # payload = jwt_payload_handler(user)
            # token = jwt_encode_handler(payload)
            # print(token)
        return JsonResponse({'hello':'success'})
    return JsonResponse({'hello':'failed'})


# Create your views here.
# class Login(generics.ListAPIView):
#     # queryset = User.objects.all()
#     serializer_class        =   UserSerializer
#     permission_classes       = (permissions.IsAuthenticatedOrReadOnly,)
#     # permission_classes = (IsAdminUser,)

#     def generateToke(self, user):
#         payload = jwt_payload_handler(user)
#         token = jwt_encode_handler(payload)
#         return token

#     def get_queryset(self):
#         qs = User.objects.all()
#         query = self.request.GET.get("q")
#         if query is not None:
#             qs = qs.filter(
#                     Q(title__icontains=query)|
#                     Q(content__icontains=query)
#                     ).distinct()
#         return qs



# class Signup(generics.CreateAPIView):
#     serializer_class        =   UserSerializer
#     permission_classes       = (permissions.IsAuthenticatedOrReadOnly,)

#     def perform_create(self, serializer):
#         serializer.save(username=self.request.username, password=self.request.password)



class Tour_cities(generics.ListAPIView):
    lookup_field            = 'pk'
    serializer_class        =   LocationSerializer
    # permission_classes       = (permissions.IsAuthenticatedOrReadOnly,)
    # queryset                = "Location.objects.all()"
    def get_queryset(self):
        print(Location.objects.all())
        return Location.objects.all()
