from django.http import JsonResponse
from django.views import View
from .services import set_budget, get_budget
from dataclasses import asdict
import json
from core.budgets.entities import Budget


class Budgets(View):
    def get(self, request):
        budget = get_budget()
        return JsonResponse({'budget': asdict(budget)})

    def put(self, request):
        budget = json.loads(request.body.decode())['budget']
        budget_set = set_budget(Budget(**budget))
        return JsonResponse({'budget': asdict(budget_set)})
