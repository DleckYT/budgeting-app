import express from 'express'
import { getAllTransactions, getTransactionById, addTransaction, deleteTransaction } from '../db/transactions.ts'

const router = express.Router()


router.get('/', async (req, res) => {
  try {
    const transactions = await getAllTransactions()
    res.json(transactions)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' })
  }
})


router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const transaction = await getTransactionById(id)
    if (transaction) {
      res.json(transaction)
    } else {
      res.status(404).json({ error: 'Transaction not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transaction' })
  }
})


router.post('/', async (req, res) => {
  try {
    const data = req.body;
    console.log('Received transaction data:', data);  // Log the transaction data from the request

    const id = await addTransaction(data);
    console.log('Transaction added with ID:', id);  // Log the ID of the newly added transaction

    res.status(201).json({ id });
  } catch (err) {
    console.error('Error adding transaction:', err);  // Log the error if something goes wrong
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const success = await deleteTransaction(id)
    if (success) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Transaction not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transaction' })
  }
})

export default router
