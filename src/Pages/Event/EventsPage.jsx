import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const EventsPage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    // Fetch events from JSON
    useEffect(() => {
        fetch('/event.json')
            .then(res => res.json())
            .then(data => {
                setAllEvents(data || []);
                setFilteredEvents(data || []);
            })
            .catch(() => {
                setAllEvents([]);
                setFilteredEvents([]);
            });
    }, []);

    // Handle search and filter
    useEffect(() => {
        let results = allEvents;

        // Filter by type
        if (filterType !== 'All') {
            results = results.filter(ev => ev['Event Type'] === filterType);
        }

        // Filter by search term
        if (searchTerm.trim()) {
            results = results.filter(ev =>
                ev['Event Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
                ev['Event Type'].toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredEvents(results);
    }, [searchTerm, filterType, allEvents]);

    // Get unique event types
    const eventTypes = ['All', ...new Set(allEvents.map(ev => ev['Event Type']))];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
        hover: {
            y: -8,
            boxShadow: '0 20px 25px rgba(28, 128, 151, 0.3)',
            transition: { duration: 0.3 },
        },
    };

    return (
        <main className='min-h-screen  py-12 px-4 sm:px-6 lg:px-8'>
            <div className='container mx-auto'>
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='mb-12 text-center'
                >
                    <h1 className='text-4xl sm:text-5xl text-[#28b7d7] font-extrabold mb-4'>
                        Discover Events
                    </h1>
                    <p className='text-[#93dbeb] text-lg max-w-2xl mx-auto'>
                        Find and join the most exciting sporting events near you
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className='mb-8 max-w-2xl mx-auto'
                >
                    <div className='relative'>
                        <HiMagnifyingGlass className='absolute left-4 top-1/2 transform -translate-y-1/2 text-[#2093ac] text-xl' />
                        <input
                            type='text'
                            placeholder='Search events by name or type...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full pl-12 pr-4 py-3 rounded-lg  text-white placeholder-[#68cde3] border-1 border-[#2093ac] focus:outline-none focus:border-[#28b7d7] transition duration-300'
                        />
                    </div>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='mb-12 flex flex-wrap justify-center gap-3'
                >
                    {eventTypes.map((type, index) => (
                        <motion.button
                            key={type}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilterType(type)}
                            className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
                                filterType === type
                                    ? 'bg-[#53c6df] text-[#0c3741] shadow-lg shadow-[#28b7d7]/50'
                                    : 'bg-[#7ed4e7] text-white hover:bg-[#53c6df] border border-[#2093ac]'
                            }`}
                        >
                            {type}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Events Grid */}
                <motion.div
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                >
                    {filteredEvents.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='col-span-full text-center py-16'
                        >
                            <p className='text-[#68cde3] text-xl'>No events found matching your criteria.</p>
                        </motion.div>
                    ) : (
                        filteredEvents.map((ev) => (
                            <motion.div
                                key={ev.id}
                                variants={cardVariants}
                                whileHover='hover'
                                className='bg-white rounded-lg overflow-hidden border-1 border-[#2093ac] cursor-pointer group'
                            >
                                {/* Image Container */}
                                <div className='relative overflow-hidden h-48 sm:h-56'>
                                    <motion.img
                                        src={ev.Picture}
                                        alt={ev['Event Name']}
                                        className='w-full h-full object-cover'
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    {/* Overlay Badge */}
                                    
                                </div>

                                {/* Content */}
                                <div className='p-6'>
                                    <h3 className='text-xl font-bold text-[#24a5c2] mb-2 group-hover:text-[#93dbeb] transition duration-300'>
                                        {ev['Event Name']}
                                    </h3>

                                    <div className='space-y-3 mb-4'>
                                        <div className='flex items-center text-[#68cde3]'>
                                            <span className='font-semibold mr-2'>📅</span>
                                            <span className='text-sm'>{ev['Event Date']}</span>
                                        </div>
                                        
                                    </div>

                                    {/* CTA Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='w-full bg-gradient-to-r from-[#28b7d7] to-[#1c8097] text-white font-bold py-2 rounded-lg hover:from-[#3dbedb] hover:to-[#2093ac] transition duration-300 shadow-lg'
                                    >
                                        View Details
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>

                {/* Results Count */}
                {filteredEvents.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className='text-center mt-12 text-[#68cde3]'
                    >
                        <p className='text-lg'>Showing {filteredEvents.length} of {allEvents.length} events</p>
                    </motion.div>
                )}
            </div>
        </main>
    );
};

export default EventsPage;