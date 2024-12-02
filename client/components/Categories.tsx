import React, { useState } from 'react'
import { useCategories, useAddCategory, useDeleteCategory } from '../hooks/useCategories'
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

function Categories() {

  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  const { data: categories } = useCategories()
  const addCategory = useAddCategory()
  const deleteCategory = useDeleteCategory()

  const [categoryData, setCategoryData] = useState({
    name: '',
  })

  // Handle input changes for the category form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryData({ ...categoryData, name: e.target.value })
  }

  // Handle form submission to add a new category
  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (categoryData.name.trim() !== '') {
      addCategory.mutate(categoryData)
      setCategoryData({ name: '' }) // Reset form after adding
    }
  }

  // Handle deleting a category
  const handleDeleteCategory = (id: number) => {
    deleteCategory.mutate(id)
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
      <form onSubmit={handleAddCategory} className="bg-white p-6 shadow-md rounded-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Category
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Categories</h2>
      <ul>
        {categories?.map((category) => (
          <li key={category.id} className="bg-white p-4 shadow-md rounded-md flex justify-between items-center">
            <p className="font-medium">{category.name}</p>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
