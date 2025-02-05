import React, { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { useUserData } from "../Context/userData";
import axios from "axios";

const NavBar = () => {
    const {userName, setUserName, email, setEmail, name, setName} = useUserData();
    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const cookieData = await axios.get("http://localhost:8000/cookie",{withCredentials:true});
                setUserName(cookieData.data.username);
                setEmail(cookieData.data.email);
                setName(cookieData.data.name);
            } catch{
                
            }
        }
        fetchData();
    },[setUserName, setEmail, setName]);
    const navigate = useNavigate();
    const LogOut = async () => {
        await axios.post("http://localhost:8000/user/logout",{},{withCredentials:true});
        setUserName(null);
    }
    return (
        <div className="flex flex-row gap-12 from-[#8B5DFF] to-[#642AB6] bg-gradient-to-r text-white font-bold p-3 pl-6 items-center">
            <div className="cursor-pointer" onClick={()=>{navigate('/')}}>Home</div>
            {userName && (<>
                <div className="cursor-pointer" onClick={()=>{navigate('/profile')}}>Profile</div>
                <div className="cursor-pointer" onClick={()=>{navigate('/createBlog')}}>Create New Blog</div>
                </>
            )}
            <div className="cursor-pointer"></div>
            <div className="ml-auto flex flex-row gap-8 mr-6">
            {!userName ? (<>
            <div className="cursor-pointer" onClick={()=>{navigate('/signup')}}>Sign Up</div>
            <div className="cursor-pointer" onClick={()=>{navigate('/login')}}>Login</div>
            </> ) : <>
            <div className="cursor-pointer">{name}</div>
            <div className="cursor-pointer" onClick={LogOut}>Log Out</div>
            </>
            }
            </div>
        </div>
    );
}

export default NavBar;