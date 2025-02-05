import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import CreateBlogPage from "./components/CreateBlogPage";
import BlogDisplayPage from "./components/BlogDisplayPage";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/createBlog" element={<CreateBlogPage/>}/>
          <Route path="/blog" element={<BlogDisplayPage/>}/>
        </Routes>
    </div>
  );
}

export default App;