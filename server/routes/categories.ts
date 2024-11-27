import express from 'express'
import { getAllCategories, getCategoryById, addCategory, deleteCategory } from '../db/categories.ts'

const router = express.Router()

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await getAllCategories()
    res.json(categories)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

// GET a single category by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const category = await getCategoryById(id)
    if (category) {
      res.json(category)
    } else {
      res.status(404).json({ error: 'Category not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch category' })
  }
})

// POST a new category
router.post('/', async (req, res) => {
  try {
    const data = req.body
    const id = await addCategory(data)
    res.status(201).json({ id })
  } catch (err) {
    res.status(500).json({ error: 'Failed to add category' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const success = await deleteCategory(id)
    if (success) {
      res.status(204).end() 
    } else {
      res.status(404).json({ error: 'Category not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category' })
  }
})

export default router
