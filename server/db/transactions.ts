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
  try {
    console.log('Inserting transaction into database:', data);  // Log the data to be inserted

    const [id] = await db('transactions').insert(data);
    
    console.log('Transaction inserted with ID:', id);  // Log the ID of the inserted transaction
    return id;
  } catch (err) {
    console.error('Error inserting transaction into database:', err);  // Log any database errors
    throw err;  // Re-throw the error to be handled by the route handler
  }
}


export async function deleteTransaction(id: number | string) {
  const result = await db('transactions').where({ id }).del()
  return result > 0 
}