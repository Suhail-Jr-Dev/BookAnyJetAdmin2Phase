import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserCards from '../components/UserCards';

function User() {
  const [formOpener, setFormOpener] = useState(false);
  const formOpenerFun = () => {
    setFormOpener((prev) => !prev);
    if (!prev) {
      resetForm();
    }
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('broker');
  const [changeForm, setChangeForm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, password, role };

    try {
      await axios.post(
        'https://privatejetcharters-server-ttz1.onrender.com/api/admin/register',
        formData
      );
      message.success('User Registered !!!');
      getUsers();
      formOpenerFun(); // Close the form after submission
    } catch (error) {
      message.error('Failed to register user');
    }
  };

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        'https://privatejetcharters-server-ttz1.onrender.com/api/admin/getalladmins'
      );
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const [deleteUserId, setDeleteUserId] = useState('');
  const [updateUserId, setUpdateUserId] = useState('');

  // Handle delete user
  useEffect(() => {
    if (deleteUserId) {
      const deleteUser = async () => {
        try {
          await axios.delete(
            `https://privatejetcharters-server-ttz1.onrender.com/api/admin/deleteadmin/${deleteUserId}`
          );
          getUsers();
          message.success('User deleted successfully!');
        } catch (error) {
          console.error('Error deleting user:', error);
          message.error('Failed to delete user');
        }
      };
      deleteUser();
    }
  }, [deleteUserId]);

  // Set the form fields with user data when updateUserId is selected
  useEffect(() => {
    if (updateUserId) {
      const selectedUser = users.find((user) => user._id === updateUserId);
      if (selectedUser) {
        setName(selectedUser.name);
        setEmail(selectedUser.email);
        setRole(selectedUser.role);
        setPassword(''); // Clear the password field for security reasons
      }
    }
  }, [updateUserId, users]);

  // Update user
  const updateUser = async (e) => {
    e.preventDefault();
    if (updateUserId) {
      const formData = { name, email, password, role };

      try {
        await axios.put(
          `https://privatejetcharters-server-ttz1.onrender.com/api/admin/updateuserrolebyid/${updateUserId}`,
          formData
        );
        message.success('User updated successfully!');
        getUsers();
        formOpenerFun(); // Close the form after update
      } catch (error) {
        console.error('Error updating user:', error);
        message.error('Failed to update user');
      }
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('broker');
    setUpdateUserId('');
    setChangeForm(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className='flex flex-wrap items-center justify-between gap-5 px-10'>
        <div>
          <h1 className='text-[1.5rem]'>Welcome to the Super Admin Panel</h1>
          <p>Handle All the User Role's here</p>
        </div>
        <button
          className='bg-blue-600 text-[1.1rem] font-semibold w-[8rem] text-white h-[2.5rem] rounded-lg'
          onClick={() => {
            formOpenerFun();
            setChangeForm(false);
          }}
        >
          Add User
        </button>
      </div>

      {/* Modal Form */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 transition-all duration-1000 ${
          formOpener ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='w-full max-w-sm p-5 bg-gray-400 rounded-lg'>
          <form
            className='w-full'
            onSubmit={changeForm ? updateUser : handleSubmit}
          >
            {/* Name Input */}
            <div className='mb-5'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              />
            </div>

            {/* Email Input */}
            <div className='mb-5'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              />
            </div>

            {/* Password Input */}
            <div className='mb-5'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              />
            </div>

            {/* Role Select */}
            <div className='mb-5'>
              <label
                htmlFor='role'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Select Role
              </label>
              <select
                id='role'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              >
                <option value='broker'>Broker</option>
                <option value='operator'>Operator</option>
                <option value='super-admin'>Super Admin</option>
                <option value='user-admin'>User Admin</option>
              </select>
            </div>

            {/* Buttons */}
            <div className='flex justify-around'>
              <button
                type='submit'
                className='text-white my-4 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5'
              >
                {changeForm ? 'Update User' : 'Create new Role'}
              </button>
              <button
                type='button'
                onClick={formOpenerFun}
                className='text-white my-4 bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5'
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* User Cards */}
      <div className='flex flex-wrap items-center justify-start gap-10 p-8 my-10'>
        {users.map((data) => (
          <UserCards
            key={data._id}
            id={data._id}
            name={data.name}
            email={data.email}
            role={data.role}
            setDeleteUserId={setDeleteUserId}
            setUpdateUserId={setUpdateUserId}
            setChangeForm={setChangeForm}
            formOpenerFun={formOpenerFun}
          />
        ))}
      </div>
    </div>
  );
}

export default User;
