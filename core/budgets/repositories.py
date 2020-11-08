from abc import ABC, abstractmethod

from .entities import Budget
from typing import List


class BudgetRepository(ABC):
    @abstractmethod
    def create_budget(self, budget: Budget) -> Budget:
        ...

    @abstractmethod
    def set_budget(self, budget: Budget):
        ...

    @abstractmethod
    def get_budget(self, budget: Budget) -> Budget:
        ...


class BudgetRepositoryOnMemory(BudgetRepository):
    _budgets: List[Budget] = list()

    def create_budget(self, budget: Budget):
        self._budgets.append(budget)

    def set_budget(self, budget: Budget):
        ...

    def get_budget(self, budget: Budget):
        return self._budgets[-1]
