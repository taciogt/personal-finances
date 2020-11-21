from core.utils.numbers import Decimal
from typing import Union
from .entities import Budget
from .repositories import BudgetRepository
from .exceptions import InvalidBudgetError


def set_budget(budget: Budget, repository: BudgetRepository) -> Budget:
    if budget.total_percentage != 1:
        raise InvalidBudgetError(f'Total budget percentage should be 100%, but is {budget.total_percentage*100:.0f}%')
    return repository.set_budget(budget)


def create_budget(amount: Union[Decimal, int], repository: BudgetRepository) -> Budget:
    if isinstance(amount, int):
        amount = Decimal(amount)
    budget = Budget(amount=amount,
                    essentials=.55, education=.05, goals=.2, retirement=.1, loose=.1)
    return repository.create_budget(budget=budget)
