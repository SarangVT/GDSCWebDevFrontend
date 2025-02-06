import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const backendUrl = "https://gdscwebdevbackend.onrender.com";
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name:"",
        username:"",
        email:"",
        password:"",
    });
    const [alert, setAlert] = useState(false);
    const handleChange = (e)=>{
        setUserData({...userData,[e.target.name]:e.target.value});
    }

    useEffect(() => {
            const timer = setTimeout(() => {
            setAlert(false);
            }, 2500);
            return () => clearTimeout(timer);
        }, [alert, setAlert]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(userData.email==null || userData.name==null || userData.password==null || userData.username==null){
            setAlert(true);
        }
        else {
            try{
                const response = await axios.post(`${backendUrl}/user/signup`,userData,{withCredentials:true,});
                navigate('/login');
            }
            catch(error){
                setAlert(true);
            }
        }
    }
 
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="mt-14 text-4xl font-extrabold text-center text-purple-500  mb-6 font-serif">Register to BlogX Now!!!</div>

            <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg ${alert ? "" : "opacity-0"}`} role="alert">
                <strong className="font-bold">Complete All Credentials, Don't Use Used Email and Username!</strong>
            </div>

            <div className="flex flex-row mt-[30px]">
                <div className="flex flex-col mr-2 gap-6 font-serif font-bold text-[18px]">
                    <span className="p-2">Name: </span>
                    <span className="p-2">Username: </span>
                    <span className="p-2">Email: </span>
                    <span className="p-2">Password: </span>
                </div>
                <div className="flex flex-col gap-6">
                    <input required onChange={handleChange} name="name" value={userData.name} type="text" placeholder="Enter Your Name" className={"shadow-xl shadow-gray-300 focus:outline-none p-2 pl-5 min-w-[300px] max-w-[400px] rounded-lg border-2 focus:border-violet-400"}/>
                    <input required onChange={handleChange} name="username" value={userData.username} type="text" placeholder="Choose a Nice Pen Name" className={"shadow-xl shadow-gray-300 focus:outline-none p-2 pl-5 max-w-[400px] rounded-lg border-2 focus:border-violet-400"}/>
                    <input required onChange={handleChange} name="email" value={userData.email} type="text" placeholder="Enter Your Email" className={"shadow-xl shadow-gray-300 focus:outline-none p-2 pl-5 max-w-[400px] rounded-lg border-2 focus:border-violet-400"}/>
                    <input required onChange={handleChange} name="password" value={userData.password} type="password" placeholder="Enter a Strong Password" className={"shadow-xl shadow-gray-300 focus:outline-none p-2 pl-5 max-w-[400px] rounded-lg border-2 focus:border-violet-400"}/>
                </div>
            </div>
            <div className="flex flex-row gap-40 text-white mt-16 font-bold">
                <button className="bg-red-500 h-[42px] p-2 pl-8 pr-8 rounded-lg"onClick={()=>setUserData({"name":"", username:"",email:"",password:""})}>Reset</button>
                <button className="bg-green-600 h-[42px] p-2 pl-8 pr-8 rounded-lg" onClick={handleSubmit}>Register</button></div>
        </div>
    );
}

export default SignUpPage;