import React, { useState } from 'react';
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import RegisterForm from '../components/Categories/RegisterForm';
import { Spin } from 'antd'

import loginImg from '../assets/images/loginImg.jpeg'

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Sending Login Payload 

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('broker');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      role,
    };

    try {
      setLoading(true);

      if (formData.role.length > 0) {
        let Response = await axios.post('https://privatejetcharters-server-ttz1.onrender.com/api/admin/login', formData);
        setLoading(false)
        return (Response)
      }
      else {
        message.error('Select User Role');
      }

      // message.success('User Registered !!!')
    }
    catch (error) {
      // message.error(error);
    }
    return (formData);
  };





  const onFinish = async (values) => {
    try {
      const response = await handleSubmit(values);
      if (response) {
        localStorage.setItem('admin', true);
        console.log(response)
        localStorage.setItem('role', response?.data.details.role)
        localStorage.setItem('user', response?.data.details.name)


        // message.success(response.data.message);
        // console.log('suhail')

        navigate("/dashboard");

      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error(err.response?.data?.message || "An error occurred during login.");
    }
  };





  return (
    <div className="flex items-center relative gap-7 flex-wrap justify-center min-h-screen">
      {
        loading && <div className="z-40 bg-gray-300 inset-0 bg-opacity-40 flex items-center absolute justify-center">
          <Spin size="large" />
        </div>
      }

      <div className='bg-gray-300 flex-wrap flex w-[55rem] rounded-lg items-center justify-center'>
        <img src={loginImg} alt="" className='w-[26rem]  rounded-lg  h-[33rem]' />

        <div className="w-full lg:w-[52%] max-w-lg p-12 space-y-8">
          <h1 className="text-3xl font-bold text-center text-LoginColor">Holla , Welcome Back!</h1>
          <form class="max-w-sm mx-auto flex gap-1 flex-col w-[100%] p-5 rounded-lg" onSubmit={onFinish} >

            <div class="mb-5">
              <label for="email" class="block mb-2 text-sm font-medium  dark:text-black"> Email</label>
              <input type="email" id="email" class="shadow-sm bg-gray-50 outline-none border border-gray-300 text-LoginColor text-sm rounded-lg block w-full p-2.5" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div class="mb-5 relative">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>

              <a href="#" className='underline text-LoginColor absolute bottom-0 right-0 top-[4.5rem]'> Forgot Password?</a>

              <input type="password" id="password"
                placeholder="Password" class="shadow-sm bg-gray-50 border outline-none border-gray-300 text-LoginColor text-sm rounded-lg block w-full p-2.5" required onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div class="max-w-sm mx-auto w-full">
              <label for="countries" class="block  mb-2 text-sm font-medium text-gray-900">Select Role</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 outline-none text-LoginColor text-sm rounded-lg block w-full p-2.5 " onChange={(e) => setRole(e.target.value)}>

                <option value={''}>Select User Role</option>
                <option value={'broker'}>Broker</option>
                <option value={'operator'}>Operator</option>
                <option value={'user-admin'}>User-admin</option>
                <option value={'super-admin'}>Super-admin</option>
              </select>
            </div>

            <button type="submit" class="text-white my-4 font-medium rounded-lg border-none outline-none text-sm px-5 py-2.5 text-center bg-LoginColor w-full">Log In </button>
          </form>
        </div>
      </div>

      {/* <RegisterForm/> */}

    </div>
  );
};

export default Login;
