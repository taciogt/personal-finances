from dataclasses import dataclass
from core.utils.numbers import Decimal


@dataclass
class Budget:
    amount: Decimal
    essentials: float
    education: float
    goals: float
    retirement: float
    loose: float

    @property
    def total_percentage(self):
        return self.essentials + self.education + self.goals + self.retirement + self.loose
