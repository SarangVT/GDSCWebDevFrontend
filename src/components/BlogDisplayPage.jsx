import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";

const BlogDisplayPage = () => {
    const [searchParams] = useSearchParams();
    const author = searchParams.get("author");
    const date = searchParams.get("date");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [content, setContent] = useState(null);
    const fetchBlog = async()=>{
    const response = await axios.get(`http://localhost:8000/singleblog`,{params: {author, date: new Date(date).toISOString(),}});
    setTitle(response.data.title);
    setDesc(response.data.description);
    setContent(response.data.content);
    }

    useEffect(()=>{
        fetchBlog();
    },[]);

    return (
      <div className="flex flex-col w-full">
        <div><NavBar/></div>
        <div className="font-bold text-[35px] mt-10 flex justify-center">{title}</div>
        <div className="flex justify-center w-full mt-14">
          <div className="w-[80vw] shadow-2xl shadow-gray-400 p-10 border-t-gray-200 border-2 rounded-lg">
            <div className="w-full" dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
        <br/>
        <div className="flex justify-center text-right mt-14 mb-10">
          <div className="w-[80vw] font-bold text-[17px] text-[#FF9D23] p-2">Author: {author}</div>
        </div>
      </div>
    );
}

export default BlogDisplayPage;