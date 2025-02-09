import React, { useState } from "react";

const CreateComment = (props) => {
    const [inputFocus, setInputFocus] = useState(false);
    return (
        <div className="w-full">
                <input type="text" placeholder="Express your views..." 
                className="w-full p-2 placeholder-yellow-500 focus:outline-none border-b-2 border-b-black"
                onFocus={()=>setInputFocus(true)}
                value={props.userInput}
                onChange={props.handleChange}
                required
                /><br/><br/>
                {inputFocus && <button className="border-gray-500 bg-gray-400 text-white py-2 px-4 rounded-lg font-bold" onClick={props.saveComment}>Publish</button>}
        </div>
    );
}

export default CreateComment;