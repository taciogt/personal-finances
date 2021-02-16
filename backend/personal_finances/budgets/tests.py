from django.test import TestCase, Client
from django.urls import reverse


class BudgetViewTests(TestCase):
    def test_hello_world(self):
        client = Client()
        url = reverse(viewname='budgets')
        response = client.put(url, data={'budget': {
            'amount': 100,
            'essentials': .55,
            'education': .05,
            'goals': .2,
            'retirement': .1,
            'loose': .1
        }}, content_type='application/json')
        print(response.status_code)
        print(response)
        self.assertEqual(response.json(), {
            'budget': {
                "amount": 100,
                "essentials": 0.55,
                "education": 0.05,
                "goals": 0.2,
                "retirement": 0.1,
                "loose": 0.1
            }
        })
