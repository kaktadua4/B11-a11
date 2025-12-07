import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { motion } from 'framer-motion';

const UserPage = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.uid || null;
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    if (!userId) {
      console.log('No user ID – login required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Fetch all bookings
      const allBookingsResponse = await axios.get('http://localhost:3000/bookings/');
      console.log('All bookings:', allBookingsResponse.data);

      // Filter bookings by current user
      const userBookings = allBookingsResponse.data.filter(booking => booking.userId === userId);
      console.log('User bookings:', userBookings);

      if (userBookings.length === 0) {
        setError('No bookings found for this user.');
        setBookings([]);
        setEvents([]);
        setLoading(false);
        return;
      }

      setBookings(userBookings);

      // Fetch full event details for each booking
      const eventPromises = userBookings.map(booking =>
        axios.get(`http://localhost:3000/events/${booking.eventId}`)
      );
      const eventResponses = await Promise.all(eventPromises);
      setEvents(eventResponses.map(res => res.data));
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`http://localhost:3000/bookings/${bookingId}`);
      alert('Booking deleted!');
      fetchBookings();
    } catch (err) {
      console.error('Error deleting booking:', err);
      alert('Failed to delete');
    }
  };

  if (!userId) {
    return <div className='min-h-screen flex items-center justify-center text-xl text-[#1c8097]'>Please log in to view your bookings.</div>;
  }

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center text-xl text-[#1c8097]'>Loading your bookings...</div>;
  }

  if (error) {
    return <div className='min-h-screen flex items-center justify-center text-xl text-red-500'>{error}</div>;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#ffffff] via-[#e9f8fb] to-[#d4f1f7] py-12 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-8'
        >
          <h1 className='text-4xl lg:text-5xl font-bold text-[#1c8097] mb-2'>Your Bookings</h1>
          <p className='text-[#24a5c2]'>Manage and view all your booked events</p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchBookings}
          className='mb-8 bg-gradient-to-r from-[#28b7d7] to-[#1c8097] text-white font-bold py-2 px-6 rounded-lg hover:shadow-lg transition'
        >
          Refresh Bookings
        </motion.button>

        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-2xl shadow-xl p-8 text-center border border-[#bee9f3]'
          >
            <p className='text-[#24a5c2] text-lg'>No bookings yet. Start booking events!</p>
          </motion.div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {events.map((event, index) => (
              <motion.div
                key={bookings[index]._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className='bg-white rounded-2xl shadow-xl overflow-hidden border border-[#bee9f3]'
              >
                {/* Event Image */}
                <div className='w-full h-11/12 bg-[#d4f1f7] overflow-hidden'>
                  <motion.img
                    src={event['Picture']}
                    alt={event['Event Name']}
                    className='w-full  h-full object-cover'
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Content */}
                <div className='p-6'>
                  <h2 className='text-2xl font-bold text-[#1c8097] mb-3'>{event['Event Name']}</h2>

                  <div className='space-y-3 mb-6 pb-6 border-b border-[#d4f1f7]'>
                    <div>
                      <p className='text-[#2093ac] text-xs font-bold uppercase mb-1'>Event Date</p>
                      <p className='text-[#1c8097] font-semibold'>
                        {new Date(event['Event Date']).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className='text-[#2093ac] text-xs font-bold uppercase mb-1'>Event Type</p>
                      <p className='text-[#1c8097] font-semibold'>{event['Event Type']}</p>
                    </div>
                    <div>
                      <p className='text-[#2093ac] text-xs font-bold uppercase mb-1'>Booking Status</p>
                      <span className='inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold'>
                        {bookings[index].status}
                      </span>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className='bg-gradient-to-r from-[#e9f8fb] to-[#d4f1f7] p-4 rounded-lg mb-6 border border-[#bee9f3]'>
                    <p className='text-[#1c8097] font-bold mb-2'>Organizer</p>
                    <p className='text-[#24a5c2] font-semibold'>{event['Creator Name']}</p>
                    <a href={`mailto:${event['Creator Email']}`} className='text-[#28b7d7] hover:text-[#1c8097] text-sm'>
                      {event['Creator Email']}
                    </a>
                  </div>

                  {/* Delete Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(bookings[index]._id)}
                    className='w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition'
                  >
                    Delete Booking
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;