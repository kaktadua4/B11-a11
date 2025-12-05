import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import noUserImage from '/user1.png';
// import { HiMenu, HiXMark } from 'react-icons/hi2';

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                setUserMenuOpen(false);
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleUserProfileClick = () => {
        if (!user) {
            navigate('/register');
        } else {
            setUserMenuOpen(!userMenuOpen);
        }
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/create-event', label: 'Create Event' },
        { to: '/events', label: 'Events' },
        ...(user ? [] : [{ to: '/register', label: 'Register' }]),
    ];

    return (
        <nav className='bg-white border-b-2 border-[#1c8097] sticky top-0 z-50'>
            <div className='container mx-auto px-4 py-4'>
                <div className='flex justify-between items-center'>
                    {/* Logo */}
                    <NavLink to='/' className='font-bold text-2xl text-[#1c8097]'>
                        AthleticHub
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className='hidden md:flex items-center gap-8'>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `font-semibold transition duration-300 ${
                                        isActive
                                            ? 'text-[#1c8097] border-b-2 border-[#1c8097] pb-1'
                                            : 'text-[#1c8097] hover:text-[#28b7d7]'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        {user && (
                            <NavLink
                                to='/user'
                                className={({ isActive }) =>
                                    `font-semibold transition duration-300 ${
                                        isActive
                                            ? 'text-[#1c8097] border-b-2 border-[#1c8097] pb-1'
                                            : 'text-[#1c8097] hover:text-[#28b7d7]'
                                    }`
                                }
                            >
                                My Profile
                            </NavLink>
                        )}
                    </div>

                    {/* Right Section - User Profile & Mobile Menu */}
                    <div className='flex items-center gap-4'>
                        {/* User Profile Dropdown */}
                        <div className='relative'>
                            <button
                                onClick={handleUserProfileClick}
                                className='avatar rounded-full w-10 h-10 overflow-hidden border-2 border-[#1c8097] hover:border-[#28b7d7] transition duration-300'
                            >
                                <img
                                    src={user?.photoURL || noUserImage}
                                    alt='user-avatar'
                                    className='w-full h-full object-cover'
                                />
                            </button>

                            {/* User Menu Dropdown */}
                            {user && userMenuOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white border-2 border-[#1c8097] rounded-lg shadow-lg z-20'>
                                    <div className='px-4 py-3 border-b border-[#1c8097]'>
                                        <p className='font-semibold text-[#1c8097]'>
                                            {user.displayName || 'User'}
                                        </p>
                                        <p className='text-sm text-[#2093ac]'>{user.email}</p>
                                    </div>
                                    <NavLink
                                        to='/user'
                                        onClick={() => setUserMenuOpen(false)}
                                        className='block px-4 py-2 text-[#1c8097] hover:bg-[#f0f8fa] transition duration-300'
                                    >
                                        My Profile
                                    </NavLink>
                                    
                                    <button
                                        onClick={handleLogOut}
                                        className='w-full text-left px-4 py-2 text-[#1c8097] hover:bg-[#f0f8fa] transition duration-300 border-t border-[#1c8097]'
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Hamburger Menu */}
                        <button
                            className='md:hidden text-[#1c8097] text-2xl'
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? '✖' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className='md:hidden mt-4 pb-4 border-t-2 border-[#1c8097]'>
                        <div className='flex flex-col gap-3 pt-4'>
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `font-semibold py-2 px-3 rounded transition duration-300 ${
                                            isActive
                                                ? 'bg-[#f0f8fa] text-[#1c8097] border-l-4 border-[#1c8097]'
                                                : 'text-[#1c8097] hover:bg-[#f0f8fa]'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            {user && (
                                <NavLink
                                    to='/my-bookings'
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `font-semibold py-2 px-3 rounded transition duration-300 ${
                                            isActive
                                                ? 'bg-[#f0f8fa] text-[#1c8097] border-l-4 border-[#1c8097]'
                                                : 'text-[#1c8097] hover:bg-[#f0f8fa]'
                                        }`
                                    }
                                >
                                    My Bookings
                                </NavLink>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;