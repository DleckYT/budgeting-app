import db from './connection.ts'
import { Category, CategoryData } from '../../models/categories.ts'

// Get all categories
export async function getAllCategories() {
  const categories = await db('category').select()
  return categories as Category[]
}

// Get a single category by ID
export async function getCategoryById(id: number | string) {
  const category = await db('category').select().first().where({ id })
  return category as Category
}

// Add a new category
export async function addCategory(data: CategoryData) {
  const [id] = await db('category').insert(data)
  return id
}


export async function deleteCategory(id: number | string) {
  const result = await db('category').where({ id }).del()
  return result > 0 
}