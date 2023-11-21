import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from '../config.js'

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_TOKEN, { expiresIn: '1d' }, (error, token) => {
      if (error) reject(error)
      resolve(token)
    })
  })
}
