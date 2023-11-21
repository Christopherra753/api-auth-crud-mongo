import Task from '../models/task.js'
import { validatePartialTask, validateTask } from '../schemas/task.js'

export const getTasks = async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
}
export const createTask = async (req, res) => {
  const result = validateTask(req.body)
  if (result.error) return res.status(400).json(result.error.issues.map(error => error.message))

  const newTask = new Task(req.body)
  const savedTask = await newTask.save()

  res.json(savedTask)
}
export const getTask = async (req, res) => {
  try {
    const { id } = req.params

    const taskFound = await Task.findById(id)
    if (!taskFound) return res.status(404).json(['Task not found'])

    res.json(taskFound)
  } catch (error) {
    res.status(500).json([error.message])
  }
}
export const deleteTask = async (req, res) => {
  const { id } = req.params
  const taskFound = await Task.findByIdAndDelete(id)
  if (!taskFound) return res.status(404).json(['Task not found'])

  res.json(taskFound)
}
export const updateTask = async (req, res) => {
  const { id } = req.params

  const result = validatePartialTask(req.body)
  if (result.error) return res.status(400).json(result.error.issues.map(error => error.message))

  const taskFound = await Task.findByIdAndUpdate(id, result.data, { new: true })
  if (!taskFound) return res.status(404).json(['Task not found'])

  res.json(taskFound)
}
