from unittest import TestCase
from .use_cases import create_budget, set_budget
from .repositories import BudgetRepositoryOnMemory
from .entities import Budget


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

    def test_sets_a_budget(self):
        budget = Budget(amount=500,
                        essentials=.5, education=.1, goals=.1, retirement=.1, loose=.2)
        budget_set = set_budget(budget=budget, repository=self.repository)

        self.assertEqual(budget_set.amount, 1000)

        saved_budget = self.repository.get_budget()
        self.assertEqual(budget_set.amount, 1000)
        self.assertEqual(budget_set.essentials, .55)
        self.assertEqual(budget_set.education, .05)
        self.assertEqual(budget_set.goals, .2)
        self.assertEqual(budget_set.retirement, .1)
        self.assertEqual(budget_set.loose, .1)

        self.assertEqual(saved_budget.essentials + saved_budget.education +
                         saved_budget.goals + saved_budget.retirement +
                         saved_budget.loose, 1)
