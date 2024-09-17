import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserCards from '../components/UserCards';

function User() {

    const [formOpener, setFormOpener] = useState(false);
    const formOpenerFun = () => setFormOpener(prev => !prev);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('broker');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { name, email, password, role };

        try {
            await axios.post('https://privatejetcharters-server-ttz1.onrender.com/api/admin/register', formData);
            setName('');
            setEmail('');
            setPassword('');
            setFormOpener(false);
            message.success('User Registered !!!');
            getUsers();
        } catch (error) {
            message.error('Failed to register user');
        }
    };

    const [users, setUsers] = useState(null);

    const getUsers = async () => {
        try {
            const response = await axios.get('https://privatejetcharters-server-ttz1.onrender.com/api/admin/getalladmins');
            setUsers(response.data); 
        } catch (error) {
            setUsers(null);
            console.error('Error fetching users:', error);
        }
    };

    const [deleteUserId, setDeleteUserId] = useState('');
    const [updateUserId, setUpdateUserId] = useState('');

    useEffect(() => {
        if (deleteUserId) {
            const deleteUser = async () => {
                try {
                    await axios.delete(`https://privatejetcharters-server-ttz1.onrender.com/api/admin/deleteadmin/${deleteUserId}`);
                    getUsers();
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            };
            deleteUser();
        }
    }, [deleteUserId]);

    useEffect(() => {
        const updateUser = async () => {
            if (updateUserId && users) {
                const response = users.data.filter((e) => e._id === updateUserId);
                if (response.length > 0) {
                    setName(response[0].name);
                    setEmail(response[0].email);
                    setPassword(response[0].password);

                    const formData = { name, email, password, role };

                    try {
                        await axios.put(`https://privatejetcharters-server-ttz1.onrender.com/api/admin/updateuserrolebyid/${updateUserId}`, formData);
                        getUsers();
                    } catch (error) {
                        console.error('Error updating user:', error);
                    }
                }
            }
        };
        updateUser();
    }, [updateUserId, users]);

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <div className='flex flex-wrap items-center justify-between gap-5 px-10'>
                <div>
                    <h1 className='text-[1.5rem]'>
                        Welcome to the Super Admin Panel
                    </h1>
                    <p>
                        Handle All the User Role's here
                    </p>
                </div>
                <button className='bg-blue-600 text-[1.1rem] font-semibold w-[8rem] text-white h-[2.5rem] rounded-lg' onClick={formOpenerFun}>
                    Add User
                </button>
            </div>

            <div className={`absolute w-[70%] py-10 transition-all duration-1000 ${formOpener ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                <form className="max-w-sm mx-auto w-[80%] bg-gray-400 p-5 rounded-lg" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)}
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                    </div>
                    <div className="max-w-sm mx-auto">
                        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Role</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                            <option value="broker">Broker</option>
                            <option value="operator">Operator</option>
                            <option value="super-admin">Super Admin</option>
                            <option value="user-admin">User Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="text-white my-4 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                        Create new Role
                    </button>
                </form>
            </div>

            <div className='flex flex-wrap items-center justify-start gap-10 p-8 my-10'>
                {users?.data?.map((data) => (
                    <UserCards key={data._id} props={{ ...data, setDeleteUserId, setUpdateUserId, setFormOpener }} />
                ))}
            </div>
        </div>
    );
}

export default User;
