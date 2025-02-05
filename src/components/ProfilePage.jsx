import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserData } from "../Context/userData";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const {userName, setUserName, email, setEmail, name, setName} = useUserData();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
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

    useEffect(()=>{
        const fetchBlogs = async() => {
            try{
            const response = await axios.get("http://localhost:8000/author/blogs",{params: {author:userName}});
            setBlogs(response.data);
            } catch{

            }
        }
        fetchBlogs();
    });
    return (
        <div className="flex flex-row">
            <div className="flex flex-col">
                <div className="w-screen"><NavBar/></div>
                <div className="text-[32px] font-bold p-2 flex justify-center text-[#16C47F]">Personal Info</div>
                

                <div className="flex justify-center p-2">
                    <div className="w-[71vw] flex justify-center flex-col p-4">
                        
                    <div className="flex flex-row justify-start gap-12 font-bold p-10 pl-2 text-[20px]">
                    <div className="flex flex-col">
                        <div className="">Name: </div>
                        <div className="">E-mail: </div>
                        <div className="">Username: </div>
                        <div className="">Total Blogs Published: </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="">{name}</div>
                        <div className="">{email}</div>
                        <div className="">{userName}</div>
                        <div className="">{blogs.length}</div>
                    </div>
                </div>
                
                <div className="text-[32px] font-bold p-2 flex justify-center text-[#FF2929]">Your Creations</div>

                    {blogs.reverse().map((blog, index) => (
                    <div key={index} style={{backgroundColor:blog.bgColor}} 
                    className={`${(blog.bgColor=="#ffffff" || blog.bgColor=="#FFFFFF") ? "text-black" : "text-white"} p-4 mt-3 rounded-lg shadow-xl shadow-gray-400 cursor-pointer border-2 border-gray-200`}
                    onClick={()=>navigate(`/blog?author=${encodeURIComponent(blog.author)}&date=${encodeURIComponent(blog.createdAt)}`)}>
                    <div className="text-xl font-bold mb-2">{blog.title}</div>
                    <div className="font-semibold">{blog.description}</div>
                    <div className="justify-self-end font-semibold">~ {blog.author}</div>
                    </div>
                ))}
                </div>
                </div>
            </div>
        </div>
    );

}

export default ProfilePage;