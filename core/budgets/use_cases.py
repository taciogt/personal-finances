from decimal import Decimal
from typing import Union

from .entities import Budget
from .repositories import BudgetRepository


def set_budget(budget: Budget, repository: BudgetRepository):
    repository.set_budget(budget)


def create_budget(amount: Union[Decimal, int], repository: BudgetRepository) -> Budget:
    budget = Budget(amount=amount,
                    essentials=.55, education=.05, goals=.2, retirement=.1, loose=.1)
    return repository.create_budget(budget=budget)
