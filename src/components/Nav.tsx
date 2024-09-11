import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TfiAlignJustify } from 'react-icons/tfi'
import Logo from '../assets/images/Resustud_Logo.png'
import '../App.css'

const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <nav className='flex justify-between w-full mb-16 pt-3'>
      <Link to={'/'} className='flex items-center gap-2'>
        <img
          src={Logo}
          alt='ResuMaster Logo'
          width={85}
          height={85}
          className='cursor-pointer rounded-xl shadow-lg ml-2 mx-auto'
        />
      </Link>
      <div>
        <button onClick={toggleDropdown}>
          <TfiAlignJustify className='animate-bounce-once mr-8 h-8 w-8' />
        </button>
        {dropdownOpen && (
          <div className='absolute right-2 mt-2 w-48 bg-white rounded-md shadow-lg z-10 Nav_slide-in'>
            <Link
              to='/'
              className='block px-4 py-2 text-gray-700 hover:bg-gray-100 h-12'
            >
              Home
            </Link>
            <Link
              to='/'
              className='block px-4 py-2 text-gray-700 hover:bg-gray-100 h-12'
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav

