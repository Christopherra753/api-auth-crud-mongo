import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from '../config.js'

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json(['Authorization denied'])

  jwt.verify(token, SECRET_TOKEN, (error, user) => {
    if (error) return res.status(401).json(['Authorization denied'])
    req.user = user
  })
  next()
}
