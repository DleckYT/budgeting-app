import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTransaction, useUpdateTransaction } from '../hooks/useTransactions'
import { useCategories } from '../hooks/useCategories'

function EditTransaction() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Fetch the transaction and categories
  const { data: transaction, isLoading: isTransactionLoading } = useTransaction(Number(id))
  const { data: categories, isLoading: isCategoriesLoading } = useCategories()
  const updateTransaction = useUpdateTransaction()

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
    category_id: 1,
    created_at: '',
  })

  // Populate form data once transaction is fetched
  useEffect(() => {
    if (transaction) {
      setFormData(transaction)
    }
  }, [transaction])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'amount' || name === 'category_id' ? Number(value) : value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (id) {
      updateTransaction.mutate(
        { ...formData, id: Number(id) },
        {
          onSuccess: () => navigate('/transactions'), // Redirect after updating
        }
      )
    }
  }

  if (isTransactionLoading || isCategoriesLoading) return <p>Loading...</p>

  return (
    <div>
      <h2>Edit Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Transaction Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Transaction Date:</label>
          <input
            type="datetime-local"
            name="created_at"
            value={formData.created_at}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Transaction</button>
      </form>
    </div>
  )
}

export default EditTransaction
