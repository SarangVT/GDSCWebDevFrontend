import React from "react";

const DisplayComment = (props) => {
   
    return (
        <div className="mt-10">
            <hr style={{ border: 'none', borderTop: '2px dashed', margin: '20px 0'}}></hr>
            {
            props.comments.map((comment, index) => (
                <div className="shadow-lg shadow-gray-400 px-2 py-3 my-4 border-2 border-gray-300 rounded-md">
                    <div className="flex justify-between">
                        <div className="font-bold">{comment.username}</div>
                        <div className="">{comment.date}</div>
                    </div>
                    <div className="">{comment.description}</div>
                </div>
        ))}
        </div>
    );
}

export default DisplayComment;