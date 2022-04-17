import json
from dataclasses import asdict
from http import HTTPStatus

from core.budgets.entities import Budget
from core.budgets.exceptions import NotFound
from django.http import JsonResponse, HttpResponse
from django.views import View

from .services import set_budget, get_budget


class Budgets(View):
    def get(self, request):
        try:
            budget = get_budget()
        except NotFound:
            return HttpResponse(status=HTTPStatus.NOT_FOUND)
        else:
            return JsonResponse({'budget': asdict(budget)})

    def put(self, request):
        budget = json.loads(request.body.decode())['budget']
        budget_set = set_budget(Budget(**budget))
        return JsonResponse({'budget': asdict(budget_set)})


def health_check(request):
    return HttpResponse('ok')
