from unittest import TestCase
from .use_cases import create_budget
from .repositories import BudgetRepositoryOnMemory


class UseCasesTestCase(TestCase):
    def setUp(self) -> None:
        self.repository = BudgetRepositoryOnMemory()

    def test_creates_default_budget(self):

        created_budget = create_budget(amount=1000, repository=self.repository)
        self.assertEqual(created_budget.amount, 1000)

        saved_budget = self.repository.get_budget()
        self.assertEqual(saved_budget.amount, 1000)
        self.assertEqual(saved_budget.essentials, .55)
        self.assertEqual(saved_budget.education, .05)
        self.assertEqual(saved_budget.goals, .2)
        self.assertEqual(saved_budget.retirement, .1)
        self.assertEqual(saved_budget.loose, .1)

        self.assertEqual(saved_budget.essentials + saved_budget.education +
                         saved_budget.goals + saved_budget.retirement +
                         saved_budget.loose, 1)
