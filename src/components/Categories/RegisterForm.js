import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
const RegisterForm = () => {
    const [emailformdata, setEmailFormData] = useState('');
    const [passwordformdata, setPasswordFormData] = useState('');

    const postFormData = async (e) => {
        e.preventDefault();
        const payLoad = {
            email: emailformdata,
            password: passwordformdata,
        };
        const url = 'https://privatejetcharters-server-ttz1.onrender.com/api/admin/register';
        try {
            const response = await axios.post(url, payLoad, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response.data);
            message.success("Registered Successfully")
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            message.error("Try Again")
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-12 space-y-8 transition duration-500 transform bg-white rounded-lg shadow-2xl hover:scale-105">
                <a href="#" className="flex items-center justify-center mb-6 text-2xl font-semibold text-blue-800">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    My Air Deal
                </a>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-blue-800">
                    Create an account
                </h1>
                <form onSubmit={postFormData} method="post" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="name@company.com"
                            required
                            onChange={(e) => setEmailFormData(e.target.value)}
                            value={emailformdata}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            onChange={(e) => setPasswordFormData(e.target.value)}
                            value={passwordformdata}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Create an account
                    </button>
                    <p className="text-sm font-light text-gray-500">
                        Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default RegisterForm;
