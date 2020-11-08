from dataclasses import dataclass
from core.numbers import Decimal


@dataclass
class Budget:
    amount: Decimal
    essentials: float
    education: float
    goals: float
    retirement: float
    loose: float
