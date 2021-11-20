from django.urls import path

from budgets.views import Budgets, health_check

urlpatterns = [
    path('', health_check, name='budgets'),
    path('budgets', Budgets.as_view(), name='budgets'),
]
