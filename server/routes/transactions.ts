import express from 'express'
import { getAllTransactions, getTransactionById, addTransaction, deleteTransaction, updateTransaction } from '../db/transactions.ts'
import { TransactionData } from '../../models/transactions.ts'

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
    console.log('Received transaction data:', data);  

    const id = await addTransaction(data);
    console.log('Transaction added with ID:', id);  

    res.status(201).json({ id });
  } catch (err) {
    console.error('Error adding transaction:', err);  
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



router.put('/:id', async (req, res) => {
  const transactionId = parseInt(req.params.id);
  const updatedData: TransactionData = req.body;

  console.log('Received updated data:', updatedData);  

  try {
    const updatedTransaction = await updateTransaction(transactionId, updatedData);

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    return res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return res.status(500).json({ message: 'Failed to update transaction' });
  }
});




export default router
