from unittest import TestCase
from .use_cases import create_budget, set_budget, get_budget
from .repositories import BudgetRepositoryInMemory
from .entities import Budget
from .exceptions import InvalidBudgetError
from core.utils.numbers import Decimal


class UseCasesTestCase(TestCase):
    def setUp(self) -> None:
        self.repository = BudgetRepositoryInMemory()

    def test_creates_default_budget(self):
        created_budget = create_budget(amount=1000, repository=self.repository)
        self.assertEqual(created_budget.amount, 1000)

        saved_budget = self.repository.get_budget()
        self.assertEqual(saved_budget.amount, 1000)
        self.assertEqual(saved_budget.essentials, 55)
        self.assertEqual(saved_budget.education, 5)
        self.assertEqual(saved_budget.goals, 20)
        self.assertEqual(saved_budget.retirement, 10)
        self.assertEqual(saved_budget.loose, 10)

        self.assertEqual(saved_budget.essentials + saved_budget.education +
                         saved_budget.goals + saved_budget.retirement +
                         saved_budget.loose, 100)

    def test_set_a_budget(self):
        budget = Budget(amount=Decimal(500),
                        essentials=50, education=10, goals=10, retirement=10, loose=20)
        budget_set = set_budget(budget=budget, repository=self.repository)

        self.assertEqual(budget_set.amount, Decimal(500))

        saved_budget = self.repository.get_budget()

        for budget in (budget_set, saved_budget):
            self.assertEqual(budget.amount, Decimal(500))
            self.assertEqual(budget.essentials, 50)
            self.assertEqual(budget.education, 10)
            self.assertEqual(budget.goals, 10)
            self.assertEqual(budget.retirement, 10)
            self.assertEqual(budget.loose, 20)

        self.assertEqual(saved_budget.essentials + saved_budget.education +
                         saved_budget.goals + saved_budget.retirement +
                         saved_budget.loose, 100)

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

    def test_get_a_budget(self):
        new_budget = Budget(amount=Decimal(600),
                            essentials=.6, education=.1, goals=.1, retirement=.1, loose=.2)
        self.repository.set_budget(budget=new_budget)

        returned_budget = get_budget(repository=self.repository)

        self.assertEqual(returned_budget, new_budget)
