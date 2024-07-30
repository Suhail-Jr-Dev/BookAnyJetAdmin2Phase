import React from 'react';
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import RegisterForm from '../components/Categories/RegisterForm';

const Login = () => {
  const navigate = useNavigate();

  const loginUserCall = async (payload) => {
    try {
      const response = await axios.post("http://localhost:8000/api/admin/login", payload);
      return response;
    } catch (err) {
      return err;
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await loginUserCall(values);
      if (response) {
        localStorage.setItem('admin', true);
        message.success(response.data.message);

        navigate("/dashboard");

      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error(err.response?.data?.message || "An error occurred during login.");
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-12 space-y-8 bg-white rounded-lg shadow-2xl transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-blue-800">Welcome Back!</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>
          <div className="flex flex-col gap-4">
            <button
              className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Login
            </button>
            <Link to={"/register"}>cnsdnc</Link>
          </div>
        </Form>
      </div>

      {/* <RegisterForm/> */}

    </div>
  );
};

export default Login;
