from http import HTTPStatus

from django.test import TestCase, Client
from django.urls import reverse

from budgets.models import BudgetModel
from budgets.services import repository
from core.budgets.entities import Budget
from core.utils.numbers import Decimal


class BudgetViewTests(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.repository = repository
        BudgetModel.objects.all().delete()

    def test_put_budget(self):
        client = Client()
        url = reverse(viewname='budgets')
        response = client.put(url, data={'budget': {
            'amount': 100,
            'essentials': 55,
            'education': 5,
            'goals': 20,
            'retirement': 10,
            'loose': 10
        }}, content_type='application/json')

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.json(), {
            'budget': {
                "amount": '100',
                "essentials": 55,
                "education": 5,
                "goals": 20,
                "retirement": 10,
                "loose": 10
            }
        })

    def test_get_budget(self):
        self.repository.create_budget(
            budget=Budget(
                amount=Decimal(1234),
                essentials=40, education=10, goals=10, retirement=20, loose=20))

        client = Client()
        url = reverse(viewname='budgets')
        response = client.get(url)

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.json(), {
            'budget': {
                "amount": '1234',
                "essentials": 40,
                "education": 10,
                "goals": 10,
                "retirement": 20,
                "loose": 20
            }
        })

    def test_get_not_existing_budget(self):

        client = Client()
        url = reverse(viewname='budgets')
        response = client.get(url)

        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND)
