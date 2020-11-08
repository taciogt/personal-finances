from unittest import TestCase
from .use_cases import create_budget
from .repositories import BudgetRepositoryOnMemory


class UseCasesTestCase(TestCase):
    def setUp(self) -> None:
        self.repository = BudgetRepositoryOnMemory()

    def test_creates_default_budget(self):

        default_budget = create_budget(amount=1000, repository=self.repository)
        self.assertEqual(default_budget.amount, 1000)
