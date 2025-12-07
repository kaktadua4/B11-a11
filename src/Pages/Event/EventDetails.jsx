import React, { useState, useContext } from 'react';  // Add useContext
import { useParams, useLoaderData, useNavigate } from 'react-router';  // Fixed import
import { motion } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';  // Import your AuthContext

const EventDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);  // Get current user from context (assuming it has 'user')
    const userId = user?.uid || null;  // Set userId to Firebase UID if logged in
    const data = useLoaderData();
    const navigate = useNavigate();

    console.log('Full loader data:', data); // Log the entire response
    const event = data;
    console.log('Event object:', event); // Log the event

    if (!event || !event['Event Name']) {
        return (
            <div className='min-h-screen bg-white flex items-center justify-center'>
                <p className='text-[#1c8097] text-xl font-semibold'>Event not found</p>
            </div>
        );
    }

    // Bookings event 
    const handleBook = async () => {
        if (!userId) {
            alert('You must be logged in to book');
            navigate('/login');  // Redirect to login if not logged in
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/bookings', {
                userId,  // Now uses Firebase UID
                eventId: id,
                
            });

            alert('Booking successful!');
            // Optional: Redirect or refresh, e.g., navigate('/user/bookings')
        } catch (err) {
            console.error('Error booking:', err);
            alert('Failed to book');
        }
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#ffffff] via-[#e9f8fb] to-[#d4f1f7] py-12 px-4'>
            <div className='container mx-auto max-w-4xl'>
                {/* Back Button */}
                <motion.button
                    whileHover={{ x: -5 }}
                    onClick={() => navigate('/events')}
                    className='mb-8 text-[#28b7d7] hover:text-[#1c8097] font-semibold flex items-center gap-2 transition'
                >
                    ← Back to Events
                </motion.button>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-white rounded-2xl shadow-xl overflow-hidden border border-[#bee9f3]'
                >
                    {/* Event Image */}
                    <div className='w-full h-auto bg-[#d4f1f7] overflow-hidden'>
                        <motion.img
                            src={event['Picture']}
                            alt={event['Event Name']}
                            className='w-full h-full object-cover'
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>

                    {/* Content Section */}
                    <div className='p-8 lg:p-12'>
                        {/* Title and Type */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className='mb-6'
                        >
                            <h1 className='text-4xl lg:text-5xl font-bold text-[#1c8097] mb-4'>
                                {event['Event Name']}
                            </h1>
                            <div className='flex flex-wrap gap-3 items-center'>
                                <span className='px-4 py-2 bg-[#d4f1f7] text-[#1c8097] rounded-full font-semibold text-sm border border-[#a9e2ef]'>
                                    {event['Event Type']}
                                </span>
                                {event['Event Date'] && (
                                    <span className='text-[#24a5c2] font-semibold'>
                                        📅 {new Date(event['Event Date']).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                )}
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className='mb-8 pb-8 border-b border-[#d4f1f7]'
                        >
                            <h3 className='text-xl font-bold text-[#1c8097] mb-3'>About this event</h3>
                            <p className='text-[#24a5c2] leading-relaxed text-lg'>
                                {event['Description']}
                            </p>
                        </motion.div>

                        {/* Event Details Grid */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'
                        >
                            {event['Event Date'] && (
                                <div className='bg-gradient-to-br from-[#e9f8fb] to-[#d4f1f7] p-6 rounded-xl border border-[#bee9f3]'>
                                    <p className='text-[#2093ac] text-xs font-bold uppercase tracking-wider mb-2'>Event Date</p>
                                    <p className='text-[#1c8097] text-2xl font-bold'>
                                        {new Date(event['Event Date']).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            )}
                            <div className='bg-gradient-to-br from-[#e9f8fb] to-[#d4f1f7] p-6 rounded-xl border border-[#bee9f3]'>
                                <p className='text-[#2093ac] text-xs font-bold uppercase tracking-wider mb-2'>Event Type</p>
                                <p className='text-[#1c8097] text-2xl font-bold'>{event['Event Type']}</p>
                            </div>
                        </motion.div>

                        {/* Organizer Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className='bg-gradient-to-r from-[#e9f8fb] to-[#d4f1f7] p-6 rounded-xl border border-[#bee9f3] mb-8'
                        >
                            <h3 className='text-[#1c8097] font-bold mb-3 text-lg'>Organized by</h3>
                            <div className='space-y-2'>
                                <p className='text-[#24a5c2] font-semibold text-lg'>{event['Creator Name']}</p>
                                <a
                                    href={`mailto:${event['Creator Email']}`}
                                    className='text-[#28b7d7] hover:text-[#1c8097] font-medium transition'
                                >
                                    {event['Creator Email']}
                                </a>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className='flex gap-4'
                        >
                            {userId ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleBook}
                                    className='flex-1 bg-gradient-to-r from-[#28b7d7] to-[#1c8097] text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition duration-300'
                                >
                                    Book Now
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/login')}
                                    className='flex-1 bg-gradient-to-r from-[#28b7d7] to-[#1c8097] text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition duration-300'
                                >
                                    Login to Book
                                </motion.button>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/events')}
                                className='px-8 py-3 border-2 border-[#28b7d7] text-[#28b7d7] font-bold rounded-lg hover:bg-[#e9f8fb] transition duration-300'
                            >
                                Cancel
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EventDetails;