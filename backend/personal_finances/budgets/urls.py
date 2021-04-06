from django.urls import path

from budgets.views import Budgets

urlpatterns = [
    path('', Budgets.as_view(), name='budgets'),
    path('budgets', Budgets.as_view(), name='budgets'),
]
