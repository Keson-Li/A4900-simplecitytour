# from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
User = get_user_model()

# from django.contrib.auth.models import User

User = get_user_model()

class test_user(APITestCase):
    def setUp(self):
        user_obj = User(username='testcfeuser', email='test@test.com')
        user_obj.set_password('randompassword')
        user_obj.save()

    def test_api(self):
        # signup
        data = {"username":"testcfeuser2","password":"randompassword","email":"testsignup@email.com"}
        url = "http://127.0.0.1:8000/api/signup/"
        response = self.client.post(url,data,format='json')
        print(response.data)

        # login
        data = {"username":"testcfeuser2","password":"randompassword"}
        url = "http://127.0.0.1:8000/api/login/"
        response = self.client.post(url,data,format='json')
        print(response.data['token'])

        # retrieve data
        data = {"test auth":"123","anothenkey":"456"}
        url = "http://127.0.0.1:8000/api/testapi/"
        # self.client.credentials(HTTP_AUTHORIZATION='JWT' +response.data['token'] )
        response = self.client.post(url,data,format='json')
        print(response.data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_post_auth(self):
    #     data = {"username":"testcfeuser","password":"randompassword"}
    #     url = "http://127.0.0.1:8000/api/login/"
    #     response = self.client.post(url,data,format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)