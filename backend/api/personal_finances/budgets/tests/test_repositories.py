from django.test import TestCase

from budgets.repositories import DjangoBudgetRepository
from core.budgets.test_repositories import BaseRepositoryTestCase


class BudgetRepositoryTests(TestCase, BaseRepositoryTestCase):
    Repository = DjangoBudgetRepository
