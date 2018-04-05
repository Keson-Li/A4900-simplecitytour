For unbuntu, do the following after "git clone ":
1, issue the following command:
sudo apt-get python3-pip
pip3 install django
pip3 install djangorestframework
pip3 install djangorestframework-jwt

2,Copy the components folder to an existing expo project:(".\simplecitytour\SCTapp")
3,Navigate to ".\SimpleCityTourServer\simplecitytour"  ($ cd .\SimpleCityTourServer\simplecitytour)
4,Issue the command to run the server ($ python manage.py runserver)
