import { formatISO } from "date-fns"
import { Transaction } from "../../../models/transactions"

const ExpenseData = [
  {
    category_id: 1,
    name: 'Petrol',
    min: 30,
    max: 100
  },
  {
    category_id: 2,
    name: 'Groceries',
    min: 10,
    max: 100
  },
  {
    category_id: 3,
    name: 'Electricity',
    min: 30,
    max: 60
  },
  {
    category_id: 2,
    name: 'McDonalds',
    min: 7,
    max: 13,
  },
  {
    category_id: 3,
    name: 'Rent',
    min: 250,
    max: 250
  },
  {
    category_id: 1,
    name: 'Gym',
    min: 20,
    max: 20
  }
]

export const CategoriesData = [
  {
    id: 1,
    name: 'Transport'
  },
  {
    id: 2,
    name: 'Food'
  },
  {
    id: 3,
    name: 'Utility'
  }
]

const startDate = new Date('2020-01-01')
const endDate = new Date('2024-12-31')

const randDate = () =>{
  const time = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
  return formatISO(new Date(time), {representation: 'date'})
}

export default function GenerateTransactions(){
  const transactions: Array<Transaction> = []

  for (let i = 0; i < 100; i++){
    const randIndex = Math.floor(Math.random() * ExpenseData.length)
    const data = ExpenseData[randIndex]
    transactions.push({
      id: i,
      name: data.name,
      category_id: data.category_id,
      amount: Math.round(Math.random() * (data.max - data.min)) + data.min,
      created_at: randDate()
    })
  }
  return transactions
}