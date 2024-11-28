import db from './connection.ts'
import { Transaction, TransactionData } from '../../models/transactions.ts'
import knex from 'knex'

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
    console.log('Inserting transaction into database:', data);  

    const [id] = await db('transactions').insert(data);
    
    console.log('Transaction inserted with ID:', id);  
    return id;
  } catch (err) {
    console.error('Error inserting transaction into database:', err);  
    throw err;  
  }
}


export async function deleteTransaction(id: number | string) {
  const result = await db('transactions').where({ id }).del()
  return result > 0 
}



export async function updateTransaction(id: number, updatedData: TransactionData): Promise<Transaction | null> {
  try {
    console.log('Updating transaction with data:', updatedData);  

    
    if (!updatedData.name || !updatedData.amount || !updatedData.category_id || !updatedData.created_at) {
      throw new Error('Missing required fields for update');
    }

    
    const updatedCount = await db('transactions')
      .where('id', id)  
      .update(updatedData);  

    if (updatedCount === 0) {
      return null;  
    }

    
    const updatedTransaction = await db('transactions').where('id', id).first();

    return updatedTransaction as Transaction;
  } catch (error) {
    console.error('Error updating transaction in DB:', error);
    throw new Error('Database update failed');
  }
}
