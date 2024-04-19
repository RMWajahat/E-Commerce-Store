import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Store/User Reducers/UserSlice';
import PageTitle from '../Extras/PageTitle';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ currentUser, setCurrentUser }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const User = useSelector(state => state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);



    const handleSignUp = (e) => {
        e.preventDefault();
        const storedUser = localStorage.getItem('user');
        if (storedUser == email) {
            toast.info("User Already Logged in");
        } else {
            dispatch(loginUser({ email, password })).then(() => {
                if (currentUser) {
                    toast.success(User.user.message);
                    setEmail("");
                    setPassword("");
                    navigate("/profile")
                } else if (User && User.error) {
                    toast.error(User.error);
                }
                setTimeout(() => {
                    setCurrentUser(localStorage.getItem('user'));
                }, 600);
            })
        }
    }

    return (
        <>
            {
                currentUser ? <PageTitle pagetitle={`Welcome ${currentUser}`} /> : <PageTitle pagetitle={"GNES - Login"} />
            }
            <div className="login_signup_container ">
                <form className="form" method='post'>
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
                            placeholder="Enter your Password"
                        />
                        {
                            passwordShown ? <AiFillEyeInvisible className='cursor-pointer' onClick={() => {
                                setPasswordShown(false)
                            }} /> : <AiFillEye className='cursor-pointer' onClick={() => {
                                setPasswordShown(true)
                            }} />
                        }
                    </div>
                    <div className="flex-row">
                        <Link to={"/forgetpassword"} className="span">Forgot password?</Link>
                    </div>
                    <button className="button-submit" onClick={handleSignUp}>Sign In</button>
                    <p className="p">
                        Don't have an account? <Link to={"/register"} className="span">Sign Up</Link>
                    </p>
                </form>
            </div>
        </>

    )
}

export default Login