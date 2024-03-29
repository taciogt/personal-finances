from typing import Optional

from budgets.models import BudgetModel

from core.budgets.entities import Budget
from core.budgets.exceptions import NotFound
from core.budgets.repositories import BudgetRepository


class DjangoBudgetRepository(BudgetRepository):
    @staticmethod
    def _entity_to_model(budget: Budget) -> BudgetModel:
        return BudgetModel(amount=float(budget.amount) * 100, essentials=budget.essentials, education=budget.education,
                           goals=budget.goals, retirement=budget.retirement, loose=budget.loose)

    def create_budget(self, budget: Budget) -> Budget:
        budget_model = self._entity_to_model(budget)
        budget_model.save()
        return budget_model.to_entity()

    def set_budget(self, budget: Budget) -> Budget:
        return self.create_budget(budget=budget)

    def get_budget(self) -> Budget:
        budget_model: Optional[BudgetModel] = BudgetModel.objects.first()
        if budget_model is None:
            raise NotFound()

        return budget_model.to_entity()
