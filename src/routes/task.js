import { Router } from 'express'
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask
} from '../controllers/task.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.get('/tasks', verifyToken, getTasks)
router.post('/tasks', verifyToken, createTask)
router.get('/tasks/:id', verifyToken, getTask)
router.delete('/tasks/:id', verifyToken, deleteTask)
router.put('/tasks/:id', verifyToken, updateTask)

export default router
