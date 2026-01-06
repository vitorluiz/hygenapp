from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User
from properties.models import Property, Accommodation

class PublicPropertiesTests(APITestCase):
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
