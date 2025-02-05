import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useUserData } from "../Context/userData";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);      
    const fetchBlogs = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8000/blogs`);
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
            <div className="w-screen"><NavBar/></div>
                <div className="flex justify-center">
                    <div className="text-white from-[#FBA518] to-[#FFE31A] bg-gradient-to-r w-[70vw] font-bold text-[17px] p-3 m-4 text-left rounded-md">Trending Blogs</div>
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