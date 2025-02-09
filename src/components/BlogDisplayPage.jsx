import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";
import CreateComment from "./CreateComment";
import DisplayComment from "./DisplayComment";
import { useUserData } from "../Context/userData";
import { formatedDateAndTime } from "../helpers/formatDate";
import backendUrl from "../helpers/serverlink";
const BlogDisplayPage = () => {
  const {userName, setUserName} = useUserData();
  useEffect(()=>{
      const fetchData = async ()=> {
          try{
              const cookieData = await axios.get(`${backendUrl}/cookie`,{withCredentials:true});
              setUserName(cookieData.data.username);
          } catch{
              
          }
      }
      fetchData();
  },[setUserName]);
    const [searchParams] = useSearchParams();
    const author = searchParams.get("author");
    const date = searchParams.get("date");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState(null);
    const [id, setId] = useState("");
    const fetchBlog = async()=>{
    const response = await axios.get(`${backendUrl}/singleblog`,{params: {author, date: new Date(date).toISOString(),}});
    setTitle(response.data.title);
    setDesc(response.data.description);
    setContent(response.data.content);
    setComments(response.data.comments);
    setId(response.data._id);
    }

    const [newComment, setNewComment] = useState("");

    const onComment = async ()=> {
      const DateStr = formatedDateAndTime(new Date());
      if(!id || !userName || !newComment){
        return;
      }
      try{
        axios.post(`${backendUrl}/blog/comment`,{
            id:id,
            username: userName,
            description: newComment,
            date: DateStr,
        });
        const addComment = {
          username: userName,
          description: newComment,
          date: DateStr,
        }
        setComments([addComment,...comments]);
        setNewComment("");
      } catch{
        console.log("Fail");
      }
    }

    useEffect(()=>{
        fetchBlog();
    },[]);

    return (
      <div className="flex flex-col w-full mb-14">
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
        <div className="flex justify-center">
          <div className="w-[80vw]"><CreateComment saveComment={onComment} userInput={newComment} handleChange={(e)=>setNewComment(e.target.value)}/></div>
        </div>
        <div className="flex justify-center">
          <div className="w-[80vw]"><DisplayComment comments={comments}/></div>
        </div>
        
      </div>
    );
}

export default BlogDisplayPage;