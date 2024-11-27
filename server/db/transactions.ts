import db from './connection.ts'
import { Transaction, TransactionData } from '../../models/transactions.ts'

export async function getAllTransactions() {
  const transactions = await db('transactions').select()
  return transactions as Transaction[]
}

export async function getTransactionById(id: number | string) {
  const transaction = await db('transactions').select().first().where({ id })
  return transaction as Transaction
}

export async function addTransaction(data: TransactionData) {
  const [id] = await db('transactions').insert(data)
  return id
}

export async function deleteTransaction(id: number | string) {
  const result = await db('transactions').where({ id }).del()
  return result > 0 
}