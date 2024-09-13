import express from 'express'
import { json } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import ResumeRoutes from './routes/resume.route'

const app = express()
app.use(json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', ResumeRoutes)

const PORT = process.env.PORT || 5025

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
