from abc import ABC, abstractmethod

from .exceptions import NotFound
from .entities import Budget
from typing import List


class BudgetRepository(ABC):
    @abstractmethod
    def create_budget(self, budget: Budget) -> Budget:
        ...

    @abstractmethod
    def set_budget(self, budget: Budget) -> Budget:
        ...

    @abstractmethod
    def get_budget(self) -> Budget:
        ...


class BudgetRepositoryInMemory(BudgetRepository):
    _budgets: List[Budget]

    def __init__(self):
        self._budgets = list()

    def create_budget(self, budget: Budget):
        self._budgets.append(budget)
        return self._budgets[-1]

    def set_budget(self, budget: Budget):
        self._budgets.append(budget)
        return self._budgets[-1]

    def get_budget(self):
        if len(self._budgets) == 0:
            raise NotFound()
        return self._budgets[-1]
