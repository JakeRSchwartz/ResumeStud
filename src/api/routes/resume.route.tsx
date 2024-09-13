import express, { Request, Response } from 'express'
import multer from 'multer'
import axios from 'axios'
//import pdf from 'pdf-parse/lib/pdf-parse.js'
import pdf from 'pdf-parse'
import 'dotenv/config'

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

const extractTextFromPDF = async (fileBuffer: Buffer) => {
  try {
    const pdfData = await pdf(fileBuffer)
    return pdfData.text
  } catch (error) {
    console.error('Error parsing PDF:', error) // Improved error logging
    throw new Error('Error parsing PDF')
  }
}

// Function to analyze the resume text
const analyzeResumeText = async (
  apiKey: string,
  resumeText: string,
  jobDescription: string
) => {
  const reviewResponse = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a career advisor and expert in resume reviews. Please provide feedback on the following resume. You are getting text parsed resume, so know that this (•) is a bullet point. Dont worry about formatting because the resume is being parsed and format may be off.'
        },
        {
          role: 'user',
          content: `Please review my resume and provide detailed feedback on how I can improve it for the job description given. My resume text: ${resumeText}. The job description: ${jobDescription}`
        }
      ],
      max_tokens: 1000
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  )

  return reviewResponse.data.choices[0].message.content // Return the feedback
}

// Endpoint to handle file upload and analysis
router.post(
  '/upload',
  upload.single('resume'),
  async (req: Request, res: Response) => {
    try {
      const file = req.file
      const jobDescription = req.body.jobDescription

      // Check for missing file or incorrect file type
      if (!file || file.mimetype !== 'application/pdf') {
        return res
          .status(400)
          .json({ message: 'Invalid file format. Please upload a PDF.' })
      }

      if (!jobDescription) {
        return res.status(400).json({ message: 'Job description is required' })
      }

      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey) {
        return res.status(500).json({ message: 'API key not set' })
      }

      // Step 1: Extract the text from PDF
      const resumeText = await extractTextFromPDF(file.buffer)

      // Step 2: Analyze the resume text using OpenAI
      const review = await analyzeResumeText(apiKey, resumeText, jobDescription)

      return res.status(200).json({ feedback: review })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Axios error:', error.response.data) // Improved error logging
        return res.status(500).json({
          message: 'Internal server error',
          error: error.response.data
        })
      } else {
        console.error('Unknown error:', error) // Log other errors
        return res.status(500).json({ message: 'Internal server error', error })
      }
    }
  }
)

export default router


