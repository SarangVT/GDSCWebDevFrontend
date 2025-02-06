import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserData } from "../Context/userData";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import backendUrl from "../helpers/serverlink";

const ProfilePage = () => {
    const {userName, setUserName, email, setEmail, name, setName} = useUserData();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const cookieData = await axios.get(`${backendUrl}/cookie`,{withCredentials:true});
                setUserName(cookieData.data.username);
                setEmail(cookieData.data.email);
                setName(cookieData.data.name);
            } catch{
                navigate('/');
            }
        }
        fetchData();
    },[setUserName, setEmail, setName]);

    useEffect(()=>{
        const fetchBlogs = async() => {
            try{
            const response = await axios.get(`${backendUrl}/author/blogs`,{params: {author:userName}});
            setBlogs(response.data);
            } catch{

            }
        }
        fetchBlogs();
    },[]);

    const onDelete = async(id)=> {
        const userConfirmation = window.confirm("Are you sure to delete this blog, this action cannot be undone!");
        if(!userConfirmation) return;
        try{
            await axios.delete(`${backendUrl}/blog/delete?id=${id}`);
            const updatedBlogs = blogs.filter(blog => blog._id !== id);
            setBlogs(updatedBlogs);
        } catch{
        }
    }

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
                
                <div className="text-[32px] font-bold p-2 flex justify-center text-[#FBA518]">Your Creations</div>

                    {blogs.reverse().map((blog, index) => (
                    <div key={index} style={{backgroundColor:blog.bgColor}} 
                    className={`${(blog.bgColor=="#ffffff" || blog.bgColor=="#FFFFFF") ? "text-black" : "text-white"} p-4 mt-3 rounded-lg shadow-xl shadow-gray-400 cursor-pointer border-2 border-gray-200`}
                    onClick={()=>navigate(`/blog?author=${encodeURIComponent(blog.author)}&date=${encodeURIComponent(blog.createdAt)}`)}>
                    <div className="flex flex-row justify-between">
                        <div className="text-xl font-bold mb-2">{blog.title}</div>
                        <div className="flex flex-row gap-4">
                            <div className="font-bold flex flex-row gap-2" onClick={(e)=>{e.stopPropagation();navigate(`/blog/edit?id=${encodeURIComponent(blog._id)}`);}}><FaEdit color="#0A5EB0" size={24} />Edit</div>
                            <div className="font-bold flex flex-row gap-2" onClick={(e)=>{e.stopPropagation();onDelete(blog._id);}}><FaTrash color="#F95454" size={20} />Delete</div>
                        </div>
                    </div>
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