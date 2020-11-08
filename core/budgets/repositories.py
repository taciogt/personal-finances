from abc import ABC, abstractmethod

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
    def get_budget(self, budget: Budget) -> Budget:
        ...


class BudgetRepositoryOnMemory(BudgetRepository):
    _budgets: List[Budget] = list()

    def create_budget(self, budget: Budget):
        self._budgets.append(budget)
        return self._budgets[-1]

    def set_budget(self, budget: Budget):
        self._budgets.append(budget)
        return self._budgets[-1]

    def get_budget(self):
        return self._budgets[-1]
