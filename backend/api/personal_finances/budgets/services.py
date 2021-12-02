from budgets.repositories import DjangoBudgetRepository
from core.budgets.use_cases import set_budget as core_set_budget, get_budget as core_get_budget
from core.budgets.repositories import BudgetRepositoryInMemory
# from core.budgets.entities import Budget
from functools import partial

# repository = BudgetRepositoryInMemory()
repository = DjangoBudgetRepository()

set_budget = partial(core_set_budget, repository=repository)
get_budget = partial(core_get_budget, repository=repository)
