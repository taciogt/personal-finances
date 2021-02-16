from core.budgets.use_cases import set_budget as core_set_budget
from core.budgets.repositories import BudgetRepositoryInMemory
# from core.budgets.entities import Budget
from functools import partial


set_budget = partial(core_set_budget, repository=BudgetRepositoryInMemory())
