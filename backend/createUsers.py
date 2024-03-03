# how to bring data into mongodb

import requests
from faker import Faker

fake = Faker()

def create_user():
    url = "http://localhost:3000/user/"

    data = {
        'email': fake.email(),
        'lastName': fake.last_name(),
        'firstName': fake.first_name(),
        'phone': fake.phone_number(),
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    response = requests.post(url, data=data, headers=headers)
    
    return response.text

def create_users(n):
    for i in range(n):
        try:
            result = create_user()
            print(f"User {i+1}/{n} created successfully")
        except Exception as e:
            print(f"Error creating user {i+1}: {e}")
    

create_users(10000)
