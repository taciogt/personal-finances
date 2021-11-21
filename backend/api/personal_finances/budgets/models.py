from django.db import models

from core.budgets.entities import Budget
from core.utils.numbers import Decimal


class BudgetModel(models.Model):
    amount = models.IntegerField()
    essentials = models.IntegerField()
    education = models.IntegerField()
    goals = models.IntegerField()
    retirement = models.IntegerField()
    loose = models.IntegerField()

    class Meta:
        db_table = 'budgets'

    def to_entity(self) -> Budget:
        return Budget(amount=Decimal(self.amount / 100), essentials=self.essentials, education=self.education,
                      goals=self.goals, retirement=self.retirement, loose=self.loose)
