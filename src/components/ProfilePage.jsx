import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserData } from "../Context/userData";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import backendUrl from "../helpers/serverlink";

const ProfilePage = () => {
    const { userName, setUserName, email, setEmail, name, setName } = useUserData();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookieData = await axios.get(`${backendUrl}/cookie`, { withCredentials: true });
                setUserName(cookieData.data.username);
                setEmail(cookieData.data.email);
                setName(cookieData.data.name);
            } catch {
                navigate('/');
            }
        };
        fetchData();
    }, [setUserName, setEmail, setName, navigate]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${backendUrl}/author/blogs`, { params: { author: userName } });
                setBlogs(response.data);
            } catch { }
        };
        fetchBlogs();
    }, [userName]);

    const onDelete = async (id) => {
        const userConfirmation = window.confirm("Are you sure to delete this blog? This action cannot be undone!");
        if (!userConfirmation) return;
        try {
            await axios.delete(`${backendUrl}/blog/delete?id=${id}`);
            setBlogs(blogs.filter(blog => blog._id !== id));
        } catch { }
    };

    return (
        <div className="flex flex-col items-center min-h-screen w-full">
            <div className="w-full"><NavBar /></div>
            <div className="text-3xl md:text-4xl font-bold p-4 text-[#16C47F] text-center">Personal Info</div>
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg font-bold">
                    <div className="flex flex-col"><span>Name:</span><span className="break-words">{name}</span></div>
                    <div className="flex flex-col"><span>Email:</span><span className="break-words">{email}</span></div>
                    <div className="flex flex-col"><span>Username:</span><span className="break-words">{userName}</span></div>
                    <div className="flex flex-col"><span>Total Blogs Published:</span><span className="break-words">{blogs.length}</span></div>
                </div>
            </div><br/><br/>
            <div className="text-3xl md:text-4xl font-bold p-4 text-[#FBA518] text-center">Your Creations</div><br/>
            <div className="w-full max-w-3xl flex flex-col gap-4">
                {blogs.slice().reverse().map((blog, index) => (
                    <div key={index} style={{ backgroundColor: blog.bgColor }}
                        className={`${(blog.bgColor === "#ffffff" || blog.bgColor === "#FFFFFF") ? "text-black" : "text-white"} p-4 rounded-lg shadow-lg cursor-pointer border border-gray-200`}
                        onClick={() => navigate(`/blog?author=${encodeURIComponent(blog.author)}&date=${encodeURIComponent(blog.createdAt)}`)}>
                        <div className="flex justify-between items-start">
                            <div className="text-xl font-bold">{blog.title}</div>
                            <div className="flex flex-col gap-2 md:gap-4 items-end">
                                <button className="flex items-center gap-2 text-blue-600 font-bold" onClick={(e) => { e.stopPropagation(); navigate(`/blog/edit?id=${encodeURIComponent(blog._id)}`); }}>
                                    <FaEdit size={20} /> Edit
                                </button>
                                <button className="flex items-center gap-2 text-red-600 font-bold" onClick={(e) => { e.stopPropagation(); onDelete(blog._id); }}>
                                    <FaTrash size={18} /> Delete
                                </button>
                            </div>
                        </div>
                        <div className="font-semibold mt-2">{blog.description}</div>
                        <div className="text-right font-semibold">~ {blog.author}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;
