import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useUserData } from "../Context/userData";
import backendUrl from "../helpers/serverlink";

const LoginPage = () => {
    const {userName, setUserName} = useUserData();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [alert, setAlert] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
        setAlert(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, [alert, setAlert]);
    
    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const cookieData = await axios.get(`${backendUrl}/cookie`,{withCredentials:true});
                setUserName(cookieData.data.username);
                navigate('/');
            } catch{
            }
        }
        fetchData();
    },[setUserName]);
    const [userData, setUserData] = useState({
        email:"",
        password:"",
    });

    const handleChange = (e)=>{
        setUserData({...userData,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(`${backendUrl}/user/login`,userData,{withCredentials:true});
            setUserName(response.data.userName);
            navigate('/');
        }
        catch(error){
            setAlert(true);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="mt-14 text-4xl font-extrabold text-center text-purple-500  mb-6 font-serif">Start Your Blogging Journey Now</div>

            <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg ${alert ? "" : "opacity-0"}`} role="alert">
            <strong className="font-bold">Incorrect Credentials</strong>
            </div>

            <div className="flex flex-row mt-[30px]">
                <div className="flex flex-col mr-2 gap-6 font-serif font-bold text-[18px]">
                    <span className="p-2">Email: </span>
                    <span className="p-2">Password: </span>
                </div>
                <div className="flex flex-col gap-6">
                    <input onChange={handleChange} name="email" value={userData.email} type="text" placeholder="Enter Your Email" className={"shadow-xl shadow-gray-300 focus:outline-none p-2 pl-5 w-[350px] rounded-lg border-2 focus:border-violet-400"}/>
                    <input onChange={handleChange} name="password" value={userData.password} type="password" placeholder="Enter a Strong Password" className={"shadow-xl shadow-gray-300 focus:outline-none p-2 pl-5 w-[350px] rounded-lg border-2 focus:border-violet-400"}/>
                </div>
            </div>
            <div className="flex flex-row gap-40 text-white mt-16 font-bold">
                <button className="bg-red-500 h-[42px] p-2 pl-8 pr-8 rounded-lg"onClick={()=>setUserData({email:"",password:""})}>Reset</button>
                <button className="bg-green-600 h-[42px] p-2 pl-8 pr-8 rounded-lg" onClick={handleSubmit}>Login</button></div>
        </div>
    );
}

export default LoginPage;