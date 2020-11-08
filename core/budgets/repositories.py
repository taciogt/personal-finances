from abc import ABC, abstractmethod

from .entities import Budget


class BudgetRepository(ABC):
    @abstractmethod
    def create_budget(self, budget: Budget) -> Budget:
        ...

    @abstractmethod
    def set_budget(self, budget: Budget):
        ...


class BudgetRepositoryOnMemory(BudgetRepository):
    ...