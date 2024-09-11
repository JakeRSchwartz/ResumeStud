import React from 'react'
import '../App.css'
const Loading: React.FC = () => {
  return (
    <div className='w-full text-center h-screen'>
      <p className='text-lg font-medium text-gray-700'>
        Uploading and analyzing resume...
      </p>
      <div className='mt-4 flex justify-center'>
        <div className='animate-spin rounded-full h-14 w-14 border-8 border-t-blue-300 border-gray-300'></div>
      </div>
    </div>
  )
}

export default Loading
