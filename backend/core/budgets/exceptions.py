class InvalidBudgetError(Exception):
    pass


class NotFound(Exception):
    def __init__(self):
        super().__init__("Budget not found")
