import axios from 'axios'
import { Budget } from '../domain/Budget'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {'Content-Type': 'application/json'}
})

export async function getBudget(): Promise<Budget> {
  console.log('on async function')
  const response = await apiClient.get('/budgets')
  console.log(response)
  const budget = response.data.budget

  return new Budget(budget.amount, budget.essentials, budget.education, budget.goals, budget.retirement, budget.loose)
}

export async function saveBudget(budget: Budget): Promise<void> {
  const data = {
    budget: {
      ...budget
    }
  }

  return apiClient.put('/budgets', data)
}