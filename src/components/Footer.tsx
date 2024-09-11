import '../App.css'
const Footer = () => {
  return (
    <footer className=' items-center text-white py-6 mt-8 w-full justify-center'>
      <div className=' px-4 sm:px-6 lg:px-8'>
        <div className="flex justify-center items-center flex-col md:flex-row">
          {/* Centered Navigation Links */}
          <div className="flex space-x-6 mb-4 md:mb-0 text-center">
            <a href="#" className="text-gray-400 hover:text-blue-200">
              About Us
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-200">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-200">
              Careers
            </a>
          </div>
        </div>
        {/* Copyright Section */}
        <div className='mt-6 border-t border-gray-700 pt-4 text-center'>
          <p className='text-gray-400 text-sm'>
            © {new Date().getFullYear()} ResuStud. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
