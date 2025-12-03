import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { Link } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import noUserImage from '/user1.png'

const Navbar = () => {

    const { user, logOutUser } = useContext(AuthContext);
    const handleLogOut = () => {
        logOutUser()
            .then(() => { })
            .catch((error) => {
                console.error(error);
            });
    };

    const links = (
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/create-event'>Add event</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/events'>Events</Link></li>
        </>
    );
    return (
        <div className='header px-2 text-[#1c8097] flex justify-between items-center'>
            <div className=" navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>

                <Link to="/" className="text-gray-600 md:ml-8 font-bold text-2xl">GigCraft</Link>
            </div>

            {/* <div className=' h-full  px-4 flex items-center gap-2'>
                <h2 className='text-2xl font-bold   pt-2'>
                    AthleticHub
                </h2>
            </div> */}
            <div className=' flex justify-between items-center w-full px-2 md:px-6 flex flex-row  gap-4' >
                <div className=' flex justify-around w-full px-2 md:px-6  flex-row ' >
                    <NavLink to='./' >Home</NavLink>
                    <NavLink to='./create-event'> Create Event</NavLink>
                    <NavLink to='./events'>Events</NavLink>
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
                    {user && (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-30 p-2">
                            <li><span>{user.displayName || user.email} </span></li>
                            <li><button onClick={handleLogOut}>Logout</button></li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;