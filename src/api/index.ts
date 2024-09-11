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

app.listen(5050, () => {
  console.log('Server is running on port 5050')
} );

export default app
