from unittest import TestCase

from .repositories import BudgetRepository
from ..utils.numbers import Decimal
from .entities import Budget
from .repositories import BudgetRepositoryInMemory
from typing import Type, TypeVar, SupportsAbs

# R = TypeVar('R', bound=SupportsAbs BudgetRepository)


class BaseRepositoryTestCase(TestCase):
    Repository: Type[BudgetRepository] = BudgetRepositoryInMemory

    def setUp(self) -> None:
        self.repository = self.Repository()

    def test_create_and_get_budget(self):
        budget = Budget(amount=Decimal(1000),
                        essentials=55, education=5, goals=20, retirement=10, loose=10)

        self.repository.create_budget(budget=budget)

        saved_budget = self.repository.get_budget()
        self.assertEqual(budget, saved_budget)

    def test_set_budget(self):
        budget = Budget(amount=Decimal(1000),
                        essentials=55, education=5, goals=20, retirement=10, loose=10)

        returned_budget = self.repository.set_budget(budget=budget)

        saved_budget = self.repository.get_budget()
        self.assertEqual(budget, returned_budget)
        self.assertEqual(budget, saved_budget)
