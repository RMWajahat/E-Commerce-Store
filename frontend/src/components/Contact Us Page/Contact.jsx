import React, { useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css' // Import the Tailwind CSS styles
import SectionHeading from '../Extras/SectionHeading'
import PageTitle from '../Extras/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../Store/Contact Reducers/contactSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Contact = useSelector(state => state.contact);



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(contactUs({ name, email, message }));
        setTimeout(() => {

        }, 600);
        if (Contact && Contact.contacted) {
            toast.info(Contact.message);

            setName('');
            setEmail('');
            setMessage('');
        } else if (Contact && Contact.error) {
            toast.error(Contact.error);
            if (!Contact.error.includes("Contact validation failed")) {
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
        }
    }
    return (
        <>
            <PageTitle pagetitle={"GNES - Contact Us"} />
            <SectionHeading heading='Contact Us' />

            <div className='w-screen h-fit py-12 '>
                <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-lg form-container ">
                    <h2 className="text-2xl font-semibold text-white mb-6">Say Something!</h2>
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name="name"
                                placeholder="John Doe"
                                required=""
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                placeholder="john@example.com"
                                required=""
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                placeholder="How can we help you?"
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
                            />
                        </div>
                        <input type="submit" value="Send Message" className='border-2 px-3 py-1 rounded-md text-white border-slate-200  hover:bg-white hover:text-black cursor-pointer' />

                    </form>
                </div>
            </div>

        </>
    )
}

export default Contact