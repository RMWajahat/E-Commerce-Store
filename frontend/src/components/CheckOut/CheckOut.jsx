import React, { useState, useRef } from 'react'
import SectionHeading from "../Extras/SectionHeading";

import PageTitle from '../Extras/PageTitle';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { toast } from 'react-toastify';

import axios from 'axios';


import { Country, State, City } from 'country-state-city';

const CheckOut = () => {
    const { pay } = useParams();
    const btnRef = useRef(null);
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");






    async function submintHandler(e) {
        e.preventDefault();

        btnRef.current.disabled = true;
        const PaymentData = {
            amount: pay,
        }
        const configuration = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        try {
            const { data } = await axios.post("/api/ecommerce/v1/payment", PaymentData, configuration);

            let clientSecret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name,
                        email,
                        address: {
                            line1: address,
                            country,
                            state,
                            postal_code: pincode
                        }
                    }
                }
            });


            if (result.error) {
                toast.error(result.error.message);
                btnRef.current.disabled = false;
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    toast.success("Payment Successful");
                    btnRef.current.disabled = false;
                    setAddress("");
                    setCountry("");
                    setPincode("");
                    setState("");
                    setName("");
                    setEmail("");
                    localStorage.removeItem("cartItems");

                } else {
                    toast.error("Payment Failed please try again");
                    btnRef.current.disabled = false;
                }
            }



        } catch (error) {
            toast.error(error.response.data.message);

            btnRef.current.disabled = false;
        }
    }






    return (
        <div className='w-[100vw] h-fit flex flex-col justify-center items-center'>
            <SectionHeading heading="Checkout" />
            <PageTitle pagetitle={`Checkout - Take you things with you.`} />
            <div className="leading-loose">
                <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl" onSubmit={(e) => submintHandler(e)}>
                    <p className="text-gray-800 font-medium">Customer information</p>
                    <div className="">
                        <label className="block text-sm text-gray-00" htmlFor="cus_name">
                            Name
                        </label>
                        <input
                            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                            id="cus_name"
                            name="cus_name"
                            type="text"
                            required
                            placeholder="Your Name"
                            aria-label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm text-gray-600" htmlFor="cus_email">
                            Email
                        </label>
                        <input
                            className="w-full px-5  py-2 text-gray-700 bg-gray-200 rounded"
                            id="cus_email"
                            name="cus_email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Your Email"
                            aria-label="Email"
                        />
                    </div>
                    <div className="mt-2">
                        <label className=" block text-sm text-gray-600" htmlFor="cus_email">
                            Address
                        </label>
                        <input
                            className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                            id="cus_email"
                            name="cus_email"
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Street"
                            aria-label="street "
                        />
                    </div>
                    <div className="w-full  mt-2">
                        <label className=" block text-sm text-gray-600" htmlFor="cus_email">
                            Country
                        </label>
                        <select required name="city" id="" className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" value={country} onChange={(e) => setCountry(e.target.value)}>
                            <option value="">Select Country</option>
                            {
                                Country?.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    {
                        country ? <>
                            <div className="inline-block mt-2 w-1/2 pr-1">
                                <label className=" text-sm block text-gray-600" htmlFor="cus_email">
                                    State
                                </label>
                                <select required name="city" id="" className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" value={state} onChange={(e) => setState(e.target.value)}>
                                    <option value="">Select State</option>
                                    {
                                        State?.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div></> : ""
                    }
                    {
                        state ? <>
                            <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                                <label className=" block text-sm text-gray-600" htmlFor="cus_email">
                                    Zip
                                </label>
                                <input
                                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                                    id="cus_email"
                                    name="cus_email"
                                    type="number"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    required
                                    placeholder="Zip"
                                    aria-label="Email"
                                />
                            </div>
                        </> : ""
                    }

                    {
                        country && address && pincode && name && email ? <>
                            <p className="mt-4 text-gray-800 font-medium">Payment information</p>
                            <div className="">
                                <label className="block text-sm text-gray-600" htmlFor="cus_name">
                                    Card Number
                                </label>
                                <CardNumberElement
                                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                                    required
                                    placeholder="Card Number"
                                    aria-label="Name"
                                />
                            </div>
                            <div className="inline-block mt-2 w-1/2 pr-1">
                                <label className="block text-sm text-gray-600" htmlFor="cus_name">
                                    Card Expiry
                                </label>
                                <CardExpiryElement
                                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                                    required
                                    aria-label="Name"
                                />
                            </div>
                            <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                                <label className="block text-sm text-gray-600" htmlFor="cus_name">
                                    Card Cvc
                                </label>
                                <CardCvcElement
                                    className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                                    required
                                />
                            </div></> : ""
                    }

                    <div className="mt-4">
                        <input
                            ref={btnRef}
                            disabled={pay ? false : true}
                            className={`px-4 py-1 text-white font-light  ${pay ? "bg-gray-900" : "bg-gray-300"} rounded cursor-pointer`}
                            type="submit"

                            value={pay ? "Pay - $" + pay : "No items in cart"}
                        />


                    </div>
                </form>
            </div >

        </div >
    )
}

export default CheckOut
