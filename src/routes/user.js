import { Router } from 'express'
import {
  login,
  logout,
  profile,
  register
} from '../controllers/user.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.get('/profile', verifyToken, profile)

export default router
