import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../../Store/User Reducers/UserSlice';
import { toast } from 'react-toastify';
import { FcAddImage } from "react-icons/fc";
import Love from '../../assets/register.svg'
import PageTitle from '../Extras/PageTitle';

const Register = () => {
    const dispatch = useDispatch();
    const handleSignIn = (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        setConfirmPassword("");

    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [file, setFile] = useState(null);

    return (
        <>
            <PageTitle pagetitle={"GNES - Register"} />
            <div className="login_signup_container ">
                <form className="form" method='post'>
                    <h1 className="text-2xl font-bold text-slate-800 text-left flex gap-4 items-center">create an account <img src={Love} className='h-14' alt="" /> </h1>
                    <div className="flex-column">
                        <label>Email </label>
                    </div>
                    <div className="inputForm">
                        <HiOutlineMail />
                        <input type="text" autoComplete={"true"} value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} className="input" placeholder="Enter your Email" required />
                    </div>
                    <div className="flex-column">
                        <label>Password </label>
                    </div>
                    <div className="inputForm">
                        <RiLockPasswordFill />
                        <input
                            type={`${passwordShown ? "text" : "password"}`}
                            className="input"
                            value={password}
                            required
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            placeholder="Enter a strong password"
                        />
                        {
                            passwordShown ? <AiFillEyeInvisible className='cursor-pointer' onClick={() => {
                                setPasswordShown(false)
                            }} /> : <AiFillEye className='cursor-pointer' onClick={() => {
                                setPasswordShown(true)
                            }} />
                        }
                    </div>
                    <div className="flex-column">
                        <label>Confirm Password </label>
                    </div>
                    <div className="inputForm">
                        <RiLockPasswordFill />
                        <input
                            type={`${passwordShown ? "text" : "password"}`}
                            className="input"
                            value={confirmpassword}
                            required
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }}
                            placeholder="Confirm your password"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="file"
                            id="fileInput"
                            className="invisible"
                            onChange={() => {
                                const file = e.target.files[0];
                                setFile(file);
                            }}
                        />
                        <label htmlFor="fileInput" className="cursor-pointer">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-500 text-white rounded-full">
                                    <FcAddImage className="h-6 w-6" />
                                </div>
                                <div className="ml-2 text-slate-900">Upload Image</div>
                            </div>
                        </label>
                    </div>
                    <button className="button-submit" onClick={handleSignIn}>Sign Up</button>
                    <p className="p">
                        Already have an account! <Link to={"/login"} className="span">Sign in</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Register
