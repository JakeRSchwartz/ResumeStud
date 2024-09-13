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
app.get('/favicon.png', (req, res) => res.status(204))


export default app
