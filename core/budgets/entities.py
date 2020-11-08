from dataclasses import dataclass
from decimal import getcontext, Decimal

getcontext().prec = 2


@dataclass
class Budget:
    amount: Decimal
    essentials: float
    education: float
    goals: float
    retirement: float
    loose: float
