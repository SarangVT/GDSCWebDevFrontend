import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../Context/userData";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import backendUrl from "../helpers/serverlink";

const NavBar = () => {
    const { userName, setUserName, email, setEmail, name, setName } = useUserData();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const LogOut = async () => {
        try {
            await axios.post(`${backendUrl}/user/logout`, {}, { withCredentials: true });
            setUserName(null);
            setEmail(null);
            setName(null);
    
            setTimeout(async () => {
                try {
                    const cookieData = await axios.get(`${backendUrl}/cookie`, { withCredentials: true });
                    if (!cookieData.data.username) {
                        setUserName(null);
                        setEmail(null);
                        setName(null);
                    }
                } catch (error) {
                    setUserName(null);
                    setEmail(null);
                    setName(null);
                }
            }, 500);
    
        } catch (error) {
        }
    };
    
    return (
        <>
        {isMobile ? (
        <nav className="bg-gradient-to-r from-[#8B5DFF] to-[#642AB6] text-white font-bold p-3 text-[18px] px-6 flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars size={28} />
        </div>
        <div className="flex flex-row justify-end gap-4">
        {userName ? (<div className="flex items-center gap-4">
            {userName && <div className="cursor-pointer" onClick={() => { navigate('/profile')}}>{name}</div>}
            {userName && <div className="cursor-pointer" onClick={LogOut}>Log Out</div>}
        </div>) : (<>
            {<div className="cursor-pointer" onClick={() => { navigate('/signup')}}>Sign Up</div>}
            {<div className="cursor-pointer" onClick={() => { navigate('/login')}}>Login</div>}
            </>
        )}
        </div>
        {menuOpen && (
            <div className="absolute top-14 left-0 w-full bg-[#642AB6] shadow-md opacity-90 z-10">
                <div className="flex flex-col p-4 gap-4">
                    <div className="cursor-pointer" onClick={() => { navigate('/'); setMenuOpen(false); }}>Home</div>
                    {userName && (
                        <div className="cursor-pointer" onClick={() => { navigate('/createBlog'); setMenuOpen(false); }}>
                            Create New Blog
                        </div>
                    )}
                </div>
            </div>
        )}
    </nav>
    //Desktop Starts
    ) : (
        <div className="flex flex-row gap-12 from-[#8B5DFF] to-[#642AB6] bg-gradient-to-r text-white font-bold p-3 pl-6 items-center">
            <div className="cursor-pointer" onClick={()=>{navigate('/')}}>Home</div>
            {userName && (<>
                <div className="cursor-pointer" onClick={()=>{navigate('/createBlog')}}>Create New Blog</div>
                </>
            )}
            <div className="cursor-pointer"></div>
            <div className="ml-auto flex flex-row gap-8 mr-6">
            {!userName ? (<>
            <div className="cursor-pointer" onClick={()=>{navigate('/signup')}}>Sign Up</div>
            <div className="cursor-pointer" onClick={()=>{navigate('/login')}}>Login</div>
            </> ) : <>
            <div className="cursor-pointer" onClick={()=>{navigate('/profile')}}>{name}</div>
            <div className="cursor-pointer" onClick={LogOut}>Log Out</div>
            </>
            }
            </div>
        </div>
    )}
    </>
);
}

export default NavBar;
