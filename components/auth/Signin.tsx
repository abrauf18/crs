import React from 'react'
import loginimage1 from '@/public/leftside1.svg';
import loginimage2 from '@/public/leftside2.svg';
import loginimage3 from '@/public/leftside3.svg';
import loginimage4 from '@/public/leftside4.svg';
import LeftSide from './common/LeftSide'
import SigninForm from './SigninForm'

const Signin = () => {
  const images = [loginimage1, loginimage2, loginimage3, loginimage4];
  const metaText = {
    title: 'Welcome Back!',
    description: 'Enter your Credentials to Access Your Account.'
  }
  return (
    <section className='sm:flex h-screen'>
      <div className='mobile:hidden flex bg-[#F5F5F5] w-full h-full basis-1/2 justify-center items-center md:p-12 p-6'>
        <LeftSide images={images} metaText={metaText} />
      </div>
      <div className='bg-[#ffffff] w-full h-full basis-1/2 flex justify-center sm:pt-12'>
        <SigninForm />
      </div>
    </section>
  )
}

export default Signin