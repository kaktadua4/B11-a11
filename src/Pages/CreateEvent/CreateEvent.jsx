import React, { useContext, useState } from 'react';
import { motion } from 'motion/react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';

const CreateEvent = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const eventData = {
            'Event Name': form.eventName.value,
            'Event Type': form.eventType.value,
            'Event Date': form.eventDate.value,
            'Description': form.description.value,
            'Creator Email': user?.email || form.creatorEmail.value,
            'Creator Name': user?.displayName || form.creatorName.value,
            'Picture': form.picture.value,
            'Location': form.location.value,
            'Capacity': parseInt(form.capacity.value),
        };

        console.log('Event Data:', eventData);
        
        // TODO: Send to backend/database
        setLoading(true);
        
        try {
            // Simulate API call
            setTimeout(() => {
                alert('Event created successfully!');
                form.reset();
                setLoading(false);
                navigate('/events');
            }, 1500);
        } catch (error) {
            console.error('Error creating event:', error);
            setLoading(false);
        }
    };

    return (
        <main className='text-[#1c8097] min-h-screen py-12 px-4'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='flex justify-center items-center flex-col'
            >
                {/* Header */}
                <div className='mb-8 flex flex-col justify-center items-center gap-4'>
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className='text-4xl font-bold'
                    >
                        Create Event
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='text-center text-[#2093ac]'
                    >
                        Share your amazing sports event with the community
                    </motion.h3>
                </div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='border-2 border-[#104956] rounded-lg shadow-lg shadow-[#1c8097]/30 w-11/12 md:w-3/5 lg:w-1/2'
                >
                    <form onSubmit={handleCreateEvent}>
                        <fieldset className='flex flex-col gap-5 p-8'>
                            {/* Event Name */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                <label className='label font-bold text-[#1c8097]'>Event Name</label>
                                <input
                                    name='eventName'
                                    type='text'
                                    required
                                    className='w-full border-2 border-[#1c8097] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#28b7d7] transition duration-300'
                                    placeholder='e.g., Open Water Swim Fest'
                                />
                            </motion.div>

                            {/* Event Type */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.35 }}
                            >
                                <label className='label font-bold text-[#1c8097]'>Event Type</label>
                                <select
                                    name='eventType'
                                    required
                                    className='w-full border-2 border-[#1c8097] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#28b7d7] transition duration-300'
                                >
                                    <option value=''>Select Event Type</option>
                                    <option value='Open Water Swimming'>Open Water Swimming</option>
                                    <option value='Marathon'>Marathon</option>
                                    <option value='Cricket'>Cricket</option>
                                    <option value='Track and Field'>Track and Field</option>
                                    <option value='Tennis'>Tennis</option>
                                    <option value='Basketball'>Basketball</option>
                                    <option value='Volleyball'>Volleyball</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </motion.div>

                            {/* Event Date */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                <label className='label font-bold text-[#1c8097]'>Event Date</label>
                                <input
                                    name='eventDate'
                                    type='date'
                                    required
                                    className='w-full border-2 border-[#1c8097] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#28b7d7] transition duration-300'
                                />
                            </motion.div>

                            {/* Location */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.45 }}
                            >
                                <label className='label font-bold text-[#1c8097]'>Location</label>
                                <input
                                    name='location'
                                    type='text'
                                    required
                                    className='w-full border-2 border-[#1c8097] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#28b7d7] transition duration-300'
                                    placeholder='e.g., Crystal Lake, NY'
                                />
                            </motion.div>

                            {/* Capacity */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                            >
                                <label className='label font-bold text-[#1c8097]'>Participant Capacity</label>
                                <input
                                    name='capacity'
                                    type='number'
                                    required
                                    min='1'
                                    className='w-full border-2 border-[#1c8097] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#28b7d7] transition duration-300'
                                    placeholder='e.g., 100'
                                />
                            </motion.div>

                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.55 }}
                            >
                                <label className='label font-bold text-[#1c8097]'>Description</label>
                                <textarea
                                    name='description'
                                    required
                                    rows='4'
                                    className='w-full border-2 border-[#1c8097] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#28b7d7] transition duration-300 resize-none'
                                    placeholder='Describe your event in detail...'
                                ></textarea>
                            </motion.div>

                            {/* Picture URL */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            >
                                <label className='label font-bold text-[#1c8097]'>Event Picture URL</label>
                                <input
                                    name='picture'
                                    type='url'
                                    required
                                    className='w-full border-2 border-[#1c8097] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#28b7d7] transition duration-300'
                                    placeholder='https://example.com/image.jpg'
                                />
                            </motion.div>

                            {/* Creator Info - Auto-filled if logged in */}
                            {!user && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.65 }}
                                    >
                                        <label className='label font-bold text-[#1c8097]'>Creator Name</label>
                                        <input
                                            name='creatorName'
                                            type='text'
                                            className='w-full border-2 border-[#1c8097] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#28b7d7] transition duration-300'
                                            placeholder='Your name'
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.7 }}
                                    >
                                        <label className='label font-bold text-[#1c8097]'>Creator Email</label>
                                        <input
                                            name='creatorEmail'
                                            type='email'
                                            className='w-full border-2 border-[#1c8097] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#28b7d7] transition duration-300'
                                            placeholder='your@email.com'
                                        />
                                    </motion.div>
                                </>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.75 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                                className='border-2 border-[#104956] rounded-lg p-3 bg-[#1c8097] text-white w-full mt-4 font-bold hover:bg-[#2093ac] transition duration-300 disabled:opacity-50'
                                type='submit'
                            >
                                {loading ? 'Creating Event...' : 'Create Event'}
                            </motion.button>
                        </fieldset>
                    </form>
                </motion.div>

                {/* Info Message */}
                {user && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className='mt-6 text-sm text-[#2093ac] text-center'
                    >
                        Logged in as: <span className='font-bold'>{user.displayName || user.email}</span>
                    </motion.p>
                )}
            </motion.div>
        </main>
    );
};

export default CreateEvent;