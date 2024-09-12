import Loading from './loading'
import { ChangeEvent, useState } from 'react'
import React from 'react'
import FeedbackComponent from './Response'
import '../App.css'

const DocUpload = () => {
  //State to store the selected file
  const url = 'http://localhost:5025'
  const [selectedFile, setselectedFile] = useState<File | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [jobDescription, setJobDescription] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(true)

  //Function to handle file change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file && file.type !== 'application/pdf') {
      alert('Only PDF files are allowed!')
      setselectedFile(null)
      return
    }

    setselectedFile(file)
  }

  const handleJobDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const JD = e.target.value
    setJobDescription(JD)
  }

  //Submit to the server
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!selectedFile) {
      alert('Please select a file first!')
      return
    }
    if (!jobDescription) {
      alert('Please enter a job description!')
      return
    }
    const wordCount = jobDescription.trim().split(/\s+/).length
    if (wordCount > 250) {
      alert('Job Description must be less than 250 characters!')
      return
    }

    const formData = new FormData()
    formData.append('resume', selectedFile)
    formData.append('jobDescription', jobDescription)
    setShowForm(false)
    setIsLoading(true)
    try {
      const response = await fetch(`${url}/api/upload`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to upload resume')
      }

      const data = await response.json()
      setFeedback(data.feedback)
    } catch (error) {
      setFeedback('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setselectedFile(null)
    setJobDescription('')
    setFeedback(null)
    setShowForm(true)
  }

  return (
    <div className='flex w-full max-w-2xl lg:max-w-2xl md:max-w-2xl bg-white p-8 rounded-lg shadow-md mt-4'>
      {showForm ? (
        <form onSubmit={handleSubmit} className='w-full space-y-4'>
          <div>
            <label
              htmlFor='resumeUpload'
              className='block text-sm font-medium text-gray-700 ml-2'
            >
              Upload your resume (PDF only):
            </label>
            <input
              type='file'
              id='resumeUpload'
              name='resume'
              accept='.pdf,.doc,.docx,.txt'
              onChange={handleFileChange}
              className='mt-2 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none text-center'
            />
            <label
              htmlFor='jobDescription'
              className='block text-sm font-medium text-gray-700 ml-2 mt-8'
            >
              Enter Job Description (Max 250 characters):
            </label>
            <textarea
              id='jobDescription'
              name='jobDescription'
              placeholder='Enter Job Description'
              onChange={handleJobDescriptionChange}
              className='mt-2 block w-full h-64 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none'
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Submit
          </button>
        </form>
      ) : isLoading ? (
        <Loading />
      ) : (
        feedback && (
          <FeedbackComponent feedback={feedback} resetForm={resetForm} />
        )
      )}
    </div>
  )
}
export default DocUpload
