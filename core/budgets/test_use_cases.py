from unittest import TestCase
from .use_cases import create_budget, set_budget
from .repositories import BudgetRepositoryOnMemory
from .entities import Budget
from .exceptions import InvalidBudgetError
from core.utils.numbers import Decimal


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
        budget = Budget(amount=Decimal(500),
                        essentials=.5, education=.1, goals=.1, retirement=.1, loose=.2)
        budget_set = set_budget(budget=budget, repository=self.repository)

        self.assertEqual(budget_set.amount, Decimal(500))

        saved_budget = self.repository.get_budget()
        self.assertEqual(budget_set.amount, Decimal(500))
        self.assertEqual(budget_set.essentials, .5)
        self.assertEqual(budget_set.education, .1)
        self.assertEqual(budget_set.goals, .1)
        self.assertEqual(budget_set.retirement, .1)
        self.assertEqual(budget_set.loose, .2)

        self.assertEqual(saved_budget.essentials + saved_budget.education +
                         saved_budget.goals + saved_budget.retirement +
                         saved_budget.loose, 1)

    def test_set_budget_with_invalid_total(self):
        budget = Budget(amount=Decimal(500),
                        essentials=.4, education=.1, goals=.1, retirement=.1, loose=.15)
        self.assertRaisesRegex(InvalidBudgetError, 'Total budget percentage should be 100%, but is 85%',
                               set_budget,
                               budget=budget, repository=self.repository)

        budget = Budget(amount=Decimal(500),
                        essentials=.4, education=.4, goals=.1, retirement=.1, loose=.15)
        self.assertRaisesRegex(InvalidBudgetError, 'Total budget percentage should be 100%, but is 115%',
                               set_budget,
                               budget=budget, repository=self.repository)
