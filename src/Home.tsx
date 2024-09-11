import DocUpload from './components/DocUpload'
import Footer from './components/Footer'
import Nav from './components/Nav'
import './App.css' // This is optional if styles are imported globally in index.js

function Home () {
  return (
    <>
      <Nav />
      <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
          Discover & Receive <br className='max-md:hidden' />
          <span className='blue_cyan_gradient text-center'>
            AI-Powered Resume Reviews
          </span>
        </h1>
        <p className='desc text-center'>
          ResuStud is a free open-source AI tool built to help you master the
          art of resume writing with easy to use instant resume feedback.
        </p>
        <p className='desc text-center font-bold'>
          Get started by uploading your resume below!
        </p>
        <DocUpload />
      </section>
      <Footer />
    </>
  )
}

export default Home
