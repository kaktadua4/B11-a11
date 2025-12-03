import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-[#93dbeb] border-t-2 border-[#1c8097] py-8'>
            <div className='container mx-auto px-4'>
                {/* Top Section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
                    <div>
                        <h3 className='text-lg font-bold text-[#1c8097] mb-4'>About AthleticHub</h3>
                        <p className='text-sm text-[#1c8097]'>Your ultimate destination for discovering and booking sports events in your area.</p>
                    </div>
                    <div>
                        <h3 className='text-lg font-bold text-[#1c8097] mb-4'>Quick Links</h3>
                        <ul className='space-y-2 text-sm text-[#1c8097]'>
                            <li><a href='/' className='hover:underline'>Home</a></li>
                            <li><a href='/events' className='hover:underline'>Events</a></li>
                            <li><a href='/about' className='hover:underline'>About</a></li>
                            <li><a href='/contact' className='hover:underline'>Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-lg font-bold text-[#1c8097] mb-4'>Support</h3>
                        <ul className='space-y-2 text-sm text-[#1c8097]'>
                            <li><a href='/' className='hover:underline'>Help Center</a></li>
                            <li><a href='/' className='hover:underline'>FAQ</a></li>
                            <li><a href='/' className='hover:underline'>Privacy Policy</a></li>
                            <li><a href='/' className='hover:underline'>Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-lg font-bold text-[#1c8097] mb-4'>Contact Us</h3>
                        <p className='text-sm text-[#1c8097] mb-2'>Email: info@athletichub.com</p>
                        <p className='text-sm text-[#1c8097] mb-2'>Phone: +1 (555) 123-4567</p>
                        <p className='text-sm text-[#1c8097]'>Address: 123 Sports Ave, City, Country</p>
                    </div>
                </div>

                {/* Divider */}
                <hr className='border-[#1c8097] mb-6' />

                {/* Bottom Section */}
                <div className='flex flex-col sm:flex-row justify-between items-center text-sm text-[#1c8097]'>
                    <p>Copyright 2025 AthleticHub. All rights reserved.</p>
                    <div className='flex gap-6 mt-4 sm:mt-0'>
                        <a href='/' className='hover:underline'>Follow us</a>
                        <a href='/' className='hover:underline'>Social Media</a>
                        <a href='/' className='hover:underline'>Newsletter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;