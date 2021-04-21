from django.test import TestCase, Client
from django.urls import reverse
from http import HTTPStatus
from budgets.services import repository
from core.budgets.entities import Budget
from core.utils.numbers import Decimal


class BudgetViewTests(TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.repository = repository

    def test_put_budget(self):
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

        self.assertEqual(response.status_code, HTTPStatus.OK)
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

    def test_get_budget(self):
        self.repository.create_budget(
            budget=Budget(
                amount=Decimal(1234),
                essentials=.4, education=.1, goals=.1, retirement=.2, loose=.2))

        client = Client()
        url = reverse(viewname='budgets')
        response = client.get(url)

        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.assertEqual(response.json(), {
            'budget': {
                "amount": '1234',
                "essentials": .4,
                "education": 0.1,
                "goals": 0.1,
                "retirement": 0.2,
                "loose": 0.2
            }
        })
