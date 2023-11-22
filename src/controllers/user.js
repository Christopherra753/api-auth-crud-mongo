import { validateLogin, validateRegister } from '../schemas/user.js'
import { getErrorMessages } from '../libs/getErrorMessages.js'
import { createAccessToken } from '../libs/jwt.js'
import User from '../models/user.js'
import { SECRET_TOKEN } from '../config.js'

import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

export const login = async (req, res) => {
  try {
    const result = validateLogin(req.body)
    if (result.error) return res.status(400).json(getErrorMessages(result.error))

    const userFound = await User.findOne({ email: result.data.email })
    if (!userFound) return res.status(404).json({ email: 'Email not found' })

    const isMatch = await bcryptjs.compare(result.data.password, userFound.password)
    if (!isMatch) return res.status(400).json({ password: 'Incorrect Password' })

    const token = await createAccessToken({ id: userFound._id })
    res.cookie('token', token)

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const register = async (req, res) => {
  try {
    const result = validateRegister(req.body)
    if (result.error) return res.status(400).json(getErrorMessages(result.error))

    const userFound = await User.findOne({ email: result.data.email })
    if (userFound) return res.status(400).json({ email: 'Email already exists' })

    const password = await bcryptjs.hash(result.data.password, 10)

    const newUser = new User({ ...req.body, password })
    const savedUser = await newUser.save()

    const token = await createAccessToken({ id: savedUser._id })
    res.cookie('token', token)

    res.json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const logout = (req, res) => {
  res.clearCookie('token')
  res.sendStatus(200)
}

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(404).json({ email: 'Email not found' })
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const verify = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'Authorization denied' })

  jwt.verify(token, SECRET_TOKEN, async (error, user) => {
    if (error) return res.status(401).json({ message: 'Authorization denied' })
    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(404).json({ message: 'User not found' })

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  })
}
