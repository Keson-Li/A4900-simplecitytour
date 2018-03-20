# from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Polygon
User = get_user_model()

# from django.contrib.auth.models import User

User = get_user_model()
ip='http://192.178.1.71:8000/'

class test_user(APITestCase):
    def setUp(self):
        polygo1  = Polygon(points='[{"lat": 49.33832241947767, "lng": -123.18763732910156, "types": []}, {"lat": 49.32505206409244, "lng": -123.13839197158813, "types": []}, {"lat": 49.32140173953507, "lng": -123.11008930206299, "types": []}, {"lat": 49.31119058261628, "lng": -123.07305335998535, "types": []}, {"lat": 49.271836861819274, "lng": -123.09785842895508, "types": []}, {"lat": 49.26511616008369, "lng": -123.12583923339844, "types": []}, {"lat": 49.27766072946756, "lng": -123.25115203857422, "types": []}, {"lat": 49.281860207286456, "lng": -123.24746131896973, "types": []}, {"lat": 49.28068438954263, "lng": -123.1648063659668, "types": []}, {"lat": 49.30078141699555, "lng": -123.16557884216309, "types": []}]')
        polygo1.save()
        polygon2  = Polygon(points='[{"lat": 49.33832241947767, "lng": -123.18763732910156, "types": []}, {"lat": 49.32505206409244, "lng": -123.13839197158813, "types": []}, {"lat": 49.32140173953507, "lng": -123.11008930206299, "types": []}, {"lat": 49.31119058261628, "lng": -123.07305335998535, "types": []}, {"lat": 49.271836861819274, "lng": -123.09785842895508, "types": []}, {"lat": 49.26511616008369, "lng": -123.12583923339844, "types": []}, {"lat": 49.27766072946756, "lng": -123.25115203857422, "types": []}, {"lat": 49.281860207286456, "lng": -123.24746131896973, "types": []}, {"lat": 49.28068438954263, "lng": -123.1648063659668, "types": []}, {"lat": 49.30078141699555, "lng": -123.16557884216309, "types": []}]')
        polygon2.save()
        user_obj = User(username='testcfeuser', email='test@test.com')
        user_obj.set_password('randompassword')
        user_obj.save()

    def test_signup(self):
        # signup
        data = {"username":"testcfeuser2","password":"randompassword","email":"testsignup@email.com"}
        path = "api/signup/"
        url  =  ip + path 
        response = self.client.post(url,data,format='json')
        # print(response._bodyText)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login(self):
        data = {"username":"testcfeuser","password":"randompassword"}
        path = 'api/login/'
        url  =  ip + path 
        response = self.client.post(url,data,format='json')
        # print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_locations(self):
        path = 'api/get_all_locations/'
        url = ip + path
        response = self.client.get(url)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_imgs(self):
        path = 'api/get_imgs/'
        url = ip + path
        response = self.client.get(url)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_get_points(self):
    #     path = 'api/get_points/'
    #     url = ip + path
    #     data = {"location": "Vancouver"}
    #     response = self.client.post(url,data,format='json')
    #     print(response.data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_audio(self):
        path = 'api/getaudio/'
        url = ip + path
        response = self.client.get(url)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)