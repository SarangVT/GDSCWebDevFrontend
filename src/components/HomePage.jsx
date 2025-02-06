import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useUserData } from "../Context/userData";
import { useNavigate } from "react-router-dom";
import backendUrl from "../helpers/serverlink";

const HomePage = () => {
    const {userName, setUserName, email, setEmail, name, setName} = useUserData();
    const [run, setRun] = useState(true);
    const handleRun = () => setRun(false);
    useEffect(()=>{
        if(!setRun) return;
        const fetchData = async ()=> {
            try{
                const cookieData = await axios.get(`${backendUrl}/cookie`,{withCredentials:true});
                setUserName(cookieData.data.username);
                setEmail(cookieData.data.email);
                setName(cookieData.data.name);
            } catch{
                
            }
        }
        fetchData();
    },[setUserName, setEmail, setName]);
    const [blogs, setBlogs] = useState([]);      
    const fetchBlogs = async (page) => {
        try {
            const response = await axios.get(`${backendUrl}/blogs`);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
      }, []);
    
    const navigate = useNavigate();

    return(
        <div className="flex flex-col">
            <div className="w-screen"><NavBar handleRun={handleRun}/></div>
                <div className="flex justify-center">
                    <div className="text-white from-[#FBA518] to-[#FFE31A] bg-gradient-to-r w-[70vw] font-bold text-[18px] p-3 m-4 text-left rounded-md">Trending Blogs</div>
                </div>
                <div className="flex justify-center p-2">
                    <div className="w-[71vw] flex justify-center flex-col p-4">
                    {blogs.slice().reverse().map((blog, index) => (
                    <div key={index} style={{backgroundColor:blog.bgColor}} 
                    className={`${(blog.bgColor=="#ffffff" || blog.bgColor=="#FFFFFF") ? "text-black" : "text-white"} p-4 mt-3 rounded-lg shadow-xl shadow-gray-400 cursor-pointer`}
                    onClick={()=>navigate(`blog?author=${encodeURIComponent(blog.author)}&date=${encodeURIComponent(blog.createdAt)}`)}>
                    <div className="text-xl font-bold mb-2">{blog.title}</div>
                    <div className="font-semibold">{blog.description}</div>
                    <div className="justify-self-end font-semibold">~ {blog.author}</div>
                    </div>
                ))}
                </div>
                </div>

            </div>
    );
}

export default HomePage;