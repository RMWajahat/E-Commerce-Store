import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import './Login.css';
import { PiPasswordDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Store/User Reducers/UserSlice';
import { toast } from 'react-toastify';
import { FcAddImage } from "react-icons/fc";
import { MdOutlinePermIdentity } from "react-icons/md";
import Love from '../../assets/register.svg'
import PageTitle from '../Extras/PageTitle';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const User = useSelector(state => state.user);

    useEffect(() => {
        if (User && User?.user.success) {
            toast.success(User?.user?.message);
            setEmail("");
            setName("");
            setPassword("");
            setConfirmPassword("");
            setAvatar(null);
            navigate("/login");

        } else if (User && (User.error != '' || User.error != null)) {
            toast.error(User.error);
        }
    }, [dispatch, User])

    const handleSignIn = (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            toast.error("Passwords does not match");
            return;
        }
        else {
            dispatch(registerUser({ name, email, password, avatar }))
        }

    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [avatar, setAvatar] = useState(null);

    return (
        <>
            <PageTitle pagetitle={"GNES - Register"} />
            <div className="login_signup_container ">
                <form className="form" method='post'>
                    <h1 className="text-2xl font-bold text-slate-800 text-left flex gap-4 items-center">create an account <img src={Love} className='h-14' alt="" /> </h1>
                    <div className="flex-column">
                        <label>Name</label>
                    </div>
                    <div className="inputForm">
                        <MdOutlinePermIdentity />
                        <input type="text" value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} className="input" placeholder="Enter your name" required />
                    </div>
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
                        <PiPasswordDuotone />
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
                            onChange={(e) => {
                                const file = e.target.files[0];
                                let reader = new FileReader();
                                reader.onload = () => {
                                    if (reader.readyState === 2) {
                                        setAvatar(reader.result);
                                    }
                                }
                                reader.readAsDataURL(file);
                            }}
                        />
                        <label htmlFor="fileInput" className="cursor-pointer">
                            <div className="flex items-center">
                                {
                                    avatar ? <img src={avatar} className="h-20 w-20 rounded-full object-cover object-top border-2 p-1 border-slate-800" alt="" /> : <div className="p-2 bg-blue-500 text-white rounded-full">
                                        <FcAddImage className="h-6 w-6" />
                                    </div>
                                }
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
