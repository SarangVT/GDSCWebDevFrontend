import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useUserData } from "../Context/userData";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import backendUrl from "../helpers/serverlink";

const CreateBlogPage = () => {
  const navigate = useNavigate();
  const {userName, setUserName, email} = useUserData();
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [description, setDescription]= useState("");

  const handleEditorChange = (value) => {
    setEditorContent(value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  }
  const findAndReplace = () => {
    const findText = prompt("Find:");
    if (!findText) return;
    const replaceText = prompt("Replace with:");
    if (!replaceText) return;

    const updatedContent = editorContent.replace(new RegExp(findText, "g"), replaceText);
    setEditorContent(updatedContent);
  };

  const handlePublish = async () => {
    try {
      const response = await axios.post(`${backendUrl}/user/blog`, {
        content: editorContent,
        title: title,
        description: description,
        author: userName,
        bgColor: bgColor,
      }, {
        headers: { "Content-Type": "application/json" }
      });
      navigate(`/`);
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleInputColorChange = (e) => {
    if (e.target.name === "colorInput") { // Ensures only this input triggers the change
      const value = e.target.value;
      if (/^#([0-9A-F]{3}){1,2}$/i.test(value) || value === "") {
        setBgColor(value);
      }
    }
  };

  return (
    <div className={"flex flex-col justify-center overflow-y-auto"}>
      <NavBar/>
      <div className="text-[#FBA518] font-bold text-[26px] p-2 justify-center flex mb-4">Create Your Masterpiece</div>
      <div className="flex justify-center mb-2"><input type="text" onChange={handleTitle} value={title} placeholder="Title of blog..." className="w-[90vw] focus:outline-none border-b-2 p-1 m-2 border-black"/></div>
      <div className="flex justify-center"><input type="text" onChange={(e)=>setDescription(e.target.value)} value={description} placeholder="Description of the blog..." className="w-[90vw] focus:outline-none border-b-2 p-1 m-2 border-black"/></div>
      <div className="mt-8 flex justify-center">
        <ReactQuill
        className={"w-[90vw] h-[80vh] rounded-lg m-0 p-0"}
        value={editorContent}
        onChange={handleEditorChange}
        placeholder="Start writing your blog here..."
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            [{ font: [] }],
            [{ color: [] }],
            [{ align: [] }], 
            ["bold", "italic", "underline","strike"],
            ["link", "image", "video"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        }}
        formats={[
          "header",
          "font",
          "color",
          "align",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "code-block",
          "list",
          "link",
          "image",
          "video",
        ]}
      />
      </div>
      <div className="flex flex-row gap-3 justify-end mr-[5vw] h-[40px] text-[18px] m-6 md:mt-20 mt-40">
        <div className="font-bold">Background Color</div>
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded-full border-none cursor-pointer p-0"/>
        <input type="text" value={bgColor} onChange={handleInputColorChange} maxLength={7} className="border p-2 rounded-lg text-lg font-mono w-28 text-center outline-none"/>
        <button className={"text-white bg-[#16C47F] p-4 rounded-lg flex items-center font-bold w-[200px] justify-center"} onClick={handlePublish}>Publish Blog</button>
      </div>
    </div>
  );
};

export default CreateBlogPage;