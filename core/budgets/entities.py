from dataclasses import dataclass
from core.utils.numbers import Decimal


@dataclass
class Budget:
    amount: Decimal
    essentials: int
    education: int
    goals: int
    retirement: int
    loose: int

    @property
    def total_percentage(self) -> int:
        return self.essentials + self.education + self.goals + self.retirement + self.loose
