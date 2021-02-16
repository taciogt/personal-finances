from django.urls import path

from budgets.views import Budgets

urlpatterns = [
    path('budgets', Budgets.as_view(), name='budgets'),
]
