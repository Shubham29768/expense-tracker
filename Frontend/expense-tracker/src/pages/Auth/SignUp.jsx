import React, { Profiler, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper';
import ProfilerPhotoSalactor from '../../components/Inputs/ProfilerPhotoSalactor';



function SignUp() {
  const [profilePic, setProfilePic] =  useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //Handle Sign up Form Submit
  const handleSignUp = async (e) =>{}
  return (
    <AuthLayout>
      <div className="lg:w-[to-100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Jion us today by entering your details below
          </p>

          <form onSubmit={handleSignUp}>
            <ProfilerPhotoSalactor image={profilePic} setImage={setProfilePic} />
            <div className="grid grid-cols-1 mg:grid-cols gap-4">
            <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="Jhon"
            type="text"
            />

          <Input 
            value={email}
            onChange={({ target }) => setEmail(target.value)} // ✅ Fixed: Arrow function parentheses
            label="Email Address"
            placeholder="jhon@example.com"
            type="text"
          />
          <div className="col-span-2">
          <Input 
            value={password}
            onChange={({ target }) => setPassword(target.value)} // ✅ Fixed: Arrow function parentheses
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
          </div>
            </div>

          </form>
      </div>
      
    </AuthLayout>
  )
}

export default SignUp
