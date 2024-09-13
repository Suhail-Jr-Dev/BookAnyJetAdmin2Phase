import { message } from 'antd';
import axios from 'axios';
import Block from 'quill/blots/block';
import React, { useEffect, useState } from 'react'
import UserCards from '../components/UserCards';

function User() {

    const [formOpener, setFormOpener] = useState(false);
    let formOpenerFun = () => {
        formOpener ? setFormOpener(false) : setFormOpener(true);
        console.log(formOpener)
    }

    // State for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('broker');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            password,
            role,
        };

        try {
            await axios.post('http://localhost:8000/api/admin/register', formData);
            setName('')
            setEmail('')
            setPassword('')
            setFormOpener(false)
            message.success('User Registered !!!')
            getUsers(); // Calling an get User's API Every time the new user is registered
        }
        catch (error) {
            // message.error(error);
        }
        // console.log(formData);
    };

    const [Users, setUsers] = useState(null); // Initialize as null or an empty array if you prefer

    let getUsers = async () => {
        try {
            try {
                let response = await axios.get('http://localhost:8000/api/admin/getalladmins');
                    setUsers(response.data); // Assuming response.data is the correct data structure
            }
            catch (error) {
                setUsers(null)
            }
            // console.log(response.data.data[0] = { ...response.data.data[0], 'age': 20 })
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    const [deleteUserId, setDeleteUserId] = useState('');
    // console.log(deleteUserId);

    useEffect(() => {
        const deleteUser = async () => {
            if (deleteUserId) {
                console.log('hai suhail');
                try {
                    await axios.delete(`http://localhost:8000/api/admin/deleteadmin/${deleteUserId}`);
                    getUsers(); // Refresh the user list after successful deletion
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            }
        };

        deleteUser();
    }, [deleteUserId]);

    useEffect(() => {
        getUsers();
    }, []);



    return (
        <div>
            <div className='flex items-center flex-wrap gap-5 justify-between px-10'>
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

            <div className={` ${formOpener ? 'flex' : 'hidden'} absolute w-[80%] py-10 `}>

                <form class="max-w-sm mx-auto w-[80%] bg-gray-400 p-5 rounded-lg" onSubmit={handleSubmit} >
                    <div class="mb-5">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name</label>
                        <input type="text" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={(e) => setName(e.target.value)} value={name} />

                    </div>
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email</label>
                        <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}
                        value={email} />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                        <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>

                    <div class="max-w-sm mx-auto">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Role</label>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setRole(e.target.value)}>

                            <option value={'broker'}>broker</option>
                            <option value={'operator'}>operator</option>
                            <option value={'super-admin'}>super-admin</option>
                            <option value={'user-admin'}>user-admin</option>

                        </select>
                    </div>




                    <button type="submit" class="text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create new Role </button>
                </form>



            </div>


            <div className=' flex  flex-wrap items-center justify-evenly gap-10 p-8 my-10'>


                {
                    Users?.data?.map((data) => (
                        // console.log(...data)
                        <UserCards key={data.id} props={{ ...data, 'setUserId': setDeleteUserId }} />
                    ))
                }





            </div>



        </div>
    )
}

export default User