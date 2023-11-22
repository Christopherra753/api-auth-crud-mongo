import { Router } from 'express'
import {
  login,
  logout,
  profile,
  register,
  verify
} from '../controllers/user.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.get('/profile', verifyToken, profile)
router.get('/verify', verify)

export default router
