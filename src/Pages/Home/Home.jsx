import React, { useState, useEffect, useRef, } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Slider from '../Slider/Slider';

const Home = () => {

    const [mockEvents, setMockEvents] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [bannerSlides, setBannerSlides] = useState([]);
    const holdIntervalRef = useRef(null);

    // Fetch events from API
    useEffect(() => {
        fetch('http://localhost:3000/events')
            .then(res => res.json())
            .then(data => setMockEvents(data || []))
            .catch((error) => {
                console.error('Error fetching events:', error);
                setMockEvents([]);
            });
    }, []);

    // Fetch banner slides from API
    useEffect(() => {
        fetch('http://localhost:3000/banner')
            .then((res) => res.json())
            .then((data) => { setBannerSlides(data || []) })
            .catch((error) => {
                console.error('Error fetching banner:', error);
                setBannerSlides([]);
            })
    }, []);

    // Fetch benefits and testimonials from API
    useEffect(() => {
        // Fetch benefits
        fetch('http://localhost:3000/benefits')
            .then(res => res.json())
            .then(data => setBenefits(data || []))
            .catch((error) => {
                console.error('Error fetching benefits:', error);
                setBenefits([]);
            });

        // Fetch testimonials
        fetch('http://localhost:3000/testimonials')
            .then(res => res.json())
            .then(data => setTestimonials(data || []))
            .catch((error) => {
                console.error('Error fetching testimonials:', error);
                setTestimonials([]);
            });
    }, []);

    const featuredEvents = mockEvents.slice(0, 6);


    // Clean up interval on unmount
    useEffect(() => {
        return () => {
            if (holdIntervalRef.current) {
                clearInterval(holdIntervalRef.current);
            }
        };
    }, []);



    return (
        <main className='min-h-screen py-10'>
            {/* custom banner section */}
            <section className='container bg-white max-w-full '>
                    <Slider bannerSlides={bannerSlides}></Slider>
            </section>

   

            {/* Featured events (example cards) */}
            <section className='container mx-auto px-4 py-8'>
                <h3 className='text-2xl text-sky-500 font-bold mb-4'>Featured Events</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {featuredEvents.length === 0 && <p>No featured events available.</p>}
                    {featuredEvents.map(ev => (
                        <div key={ev.id} className='border border-[#2093ac] rounded-lg p-4 shadow-sm'>
                            <img src={ev.Picture} alt={ev["Event Name"]} className='w-full object-cover rounded-md mb-3' />
                            <h4 className='font-semibold text-sky-400'>{ev["Event Name"]}</h4>
                            <p className='text-sm text-blue-400'>{ev["Event Type"]} — {ev["Event Date"]}</p>
                            {/* <button onClick={() => handleDetailsClick(ev.id)} className='mt-3 text-blue-600 underline'>Details</button> */}
                        </div>
                    ))}
                </div>
            </section>
            {/* Why Choose AthleticHub */}
            <section className='bg-[#7ed4e7] py-16'>
                <div className='container mx-auto px-4'>
                    <h3 className='text-4xl font-bold text-center text-white mb-12'>Why AthleticHub?</h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
                        {benefits.map((benefit, index) => (
                            <div key={index} className='bg-white p-8 rounded-xl shadow-2xl'>
                                <span className='text-5xl mb-4 block'>{benefit.icon}</span>
                                <h4 className='text-2xl font-semibold text-[#28b7d7] mb-3'>{benefit.title}</h4>
                                <p className='text-[#24a5c2]'>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Athlete Testimonials */}
            <section className='container mx-auto px-4 py-16'>
                <h3 className='text-4xl font-bold text-center text-[#28b7d7] mb-4'>Hear From Our Community</h3>
                <p className='text-center text-[#3dbedb] mb-12'>Real feedback from athletes and organizers.</p>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {testimonials.map((testimony, index) => (
                        <div key={index} className='bg-white p-6 rounded-xl shadow-xl border-t-4 border-[#28b7d7]'>
                            <p className='italic text-gray-700 mb-4'>
                                "<span className='font-serif text-lg'>...</span> {testimony.quote} <span className='font-serif text-lg'>...</span>"
                            </p>
                            <div className='text-right border-t border-[#28b7d7] pt-3'>
                                <p className='font-semibold text-[#28b7d7]'>{testimony.name}</p>
                                <p className='text-sm text-[#3dbedb]'>{testimony.sport}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;