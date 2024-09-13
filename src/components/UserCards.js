import React from 'react'

function UserCards({ props }) {
    // console.log(props)
    return (
        <div className=' border  shadow-xl rounded-md flex flex-col gap-4 p-3 min-w-[20rem]' key={props._id}>

            <div className=' flex gap-2  '>

                <div className='font-semibold flex flex-col gap-2' >
                    <div >
                        <h1>Name : </h1>
                    </div>

                    <div>
                        <h1>Email : </h1>
                    </div>



                    <div>
                        <h1>Role : </h1>
                    </div>

                </div>

                <div className=' flex flex-col gap-2' >
                    <div>
                        <h1>{props.name}</h1>
                    </div>
                    <div>
                        <h1>{props.email}</h1>
                    </div>

                    <div>
                        <h1>{props.role}</h1>

                    </div>



                </div>



            </div>

            <div className=' flex gap-10 font-semibold text-white'>
                <button className=' bg-green-600 w-[40%] h-[2rem] rounded-sm hover:scale-105 transition-all duration-300' >Edit</button>
                <button className=' bg-red-600 w-[40%] h-[2rem] rounded-sm hover:scale-105 transition-all duration-300' onClick={(e) => {
                    console.log(e._id);
                    props.setUserId(props._id);
                }} >Delete</button>
            </div>




        </div>
    )
}

export default UserCards