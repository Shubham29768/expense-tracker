import React from 'react';
import AuthLayout from '../../components/layouts/AuthLayout'
import myImage from '../../assets/image/card2.png';

const Login = () => {
  return (
    <AuthLayout>
      <div className="w-full h-3/4 flex flex-col justify-center px-6 md:px-10">
        <img src={myImage} alt="Card" className="mb-6 w-32 mx-auto" />
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xl text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>
      </div>
    </AuthLayout>
  )
}

export default Login;
