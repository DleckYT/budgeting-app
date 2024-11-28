import request from 'superagent'
import { Transaction, TransactionData } from '../../models/transactions'


const rootUrl = '/api/v1'

// Fetch all transactions
export function getTransactions(): Promise<Transaction[]> {
  return request.get(`${rootUrl}/transactions`).then((res) => {
    return res.body
  })
}

// Fetch a single transaction by ID
export function getTransactionById(id: number): Promise<Transaction> {
  return request.get(`${rootUrl}/transactions/${id}`).then((res) => {
    return res.body
  })
}

// Add a new transaction
export function addTransaction(transaction: TransactionData) {
  return request
    .post(`${rootUrl}/transactions`)
    .send(transaction) // sends the transaction object as the body of the request
    .then((res) => {
      // Assuming the response contains the newly added transaction ID
      return res.body.id
    })
    .catch((err) => {
      // Handle error (logging or rethrowing as necessary)
      console.error('Error adding transaction:', err)
      throw new Error('Failed to add transaction')
    })
}

// Delete a transaction by ID
export function deleteTransaction(id: number): Promise<void> {
  return request.delete(`${rootUrl}/transactions/${id}`).then(() => {})
}


export function updateTransaction(transaction: Transaction): Promise<void> {
  return request
    .put(`${rootUrl}/transactions/${transaction.id}`)
    .send(transaction)
    .then(() => {})
    .catch((err) => {
      console.error('Error updating transaction:', err)
      throw new Error('Failed to update transaction')
    })
}