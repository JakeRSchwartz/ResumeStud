import React from 'react'
import { FeedbackComponentProps } from '../interfaces/feedbackComp'
import '../App.css'
const FeedbackComponent: React.FC<FeedbackComponentProps> = ({
  feedback,
  resetForm
}) => {
  return (
    <div className='w-full text-center'>
      <h2 className='text-lg font-medium text-gray-700 mb-4'>Feedback:</h2>
      <pre className='text-gray-600 whitespace-pre-wrap break-words bg-gray-100 p-4 rounded-lg max-h-96 overflow-y-auto'>
        {feedback}
      </pre>
      <button
        onClick={resetForm}
        className='mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
      >
        Upload Another Resume
      </button>
    </div>
  )
}

export default FeedbackComponent
