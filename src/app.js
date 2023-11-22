import express from 'express'
import { connectDB } from './database.js'
import routerUser from './routes/user.js'
import routerTask from './routes/task.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/api', routerUser)
app.use('/api', routerTask)

app.listen(3000)
console.log('Servidor corriendo en el puerto 3000')
