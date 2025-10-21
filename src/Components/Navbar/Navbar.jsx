import React from 'react';
import { NavLink } from 'react-router';
import noUserImage from '/user1.png'
const Navbar = () => {

    return (
        <div className='header px-2 text-[#1c8097] flex justify-between items-center'>
            <div className=' h-full  px-4 flex items-center gap-2'>
                <h2 className='text-2xl font-bold   pt-2'>
                    AthleticHub
                </h2>
            </div>
            <div className=' flex justify-between items-center w-full px-2 md:px-6 flex flex-row  gap-4' >
                <div className=' flex justify-around w-full px-2 md:px-6  flex-row ' >
                    <NavLink to='./' >Home</NavLink>
                    <NavLink to='./create-event'> Create Event</NavLink>

                    <NavLink to='./register'>Register</NavLink>
                </div>
                {/* <div className='w-6'>
                    <img className=' ' src={userImage} alt="" />
                </div> */}
                <div className="dropdown  dropdown-end">
                    <div tabIndex={0} role="button" className=" avatar">
                        <div className="w-6 rounded-full">
                            <img
                                src={noUserImage} alt="no-user-image" />
                        </div>
                    </div>
                    <ul
                        tabIndex=""
                        className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-30 p-2">
                        <li><a>Sign out</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;