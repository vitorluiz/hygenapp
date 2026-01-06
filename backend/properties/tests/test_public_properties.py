from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User
from properties.models import Property, Accommodation

from django.db import connection

class PublicPropertiesTests(APITestCase):
    @classmethod
    def setUpClass(cls):
        with connection.cursor() as cursor:
            cursor.execute("CREATE EXTENSION IF NOT EXISTS unaccent")
        super().setUpClass()

    def setUp(self):
        self.user = User.objects.create_user(
            username='owner', 
            email='test@example.com', 
            password='password123',
            is_owner=True
        )
        
        # Create Active Property
        self.prop1 = Property.objects.create(
            owner=self.user,
            name='Pousada Ativa',
            city='Chapada',
            state='MT',
            is_active=True
        )

        # Create Inactive Image
        self.prop2 = Property.objects.create(
            owner=self.user,
            name='Pousada Inativa',
            city='Cuiabá',
            state='MT',
            is_active=False
        )
        
    def test_list_public_properties(self):
        """Should return only active properties"""
        url = reverse('public-property-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Pousada Ativa')
        self.assertIn('slug', response.data['results'][0])

    def test_search_properties(self):
        """Should filter by name"""
        url = reverse('public-property-list')
        response = self.client.get(url, {'search': 'Ativa'})
        
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Pousada Ativa')
        
        response = self.client.get(url, {'search': 'Inexistente'})
        self.assertEqual(len(response.data['results']), 0)

    def test_search_properties_unaccent_insensitive(self):
        """Should filter by name/city ignoring case and accents"""
        # Create properties specifically for this test
        Property.objects.create(
            owner=self.user,
            name='Café Véu da Noiva',
            city='Poconé',
            state='MT',
            is_active=True
        )
        
        url = reverse('public-property-list')
        
        # Test 1: Case Insensitive
        response = self.client.get(url, {'search': 'café'})
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Café Véu da Noiva')
        
        # Test 2: Unaccent (Search term without accent finds accented name)
        response = self.client.get(url, {'search': 'veu'})
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Café Véu da Noiva')
        
        # Test 3: Unaccent in City
        response = self.client.get(url, {'search': 'pocone'})
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['city'], 'Poconé')
        
        # Test 4: Combined Case and Unaccent
        response = self.client.get(url, {'search': 'VEU'})
        self.assertEqual(len(response.data['results']), 1)
