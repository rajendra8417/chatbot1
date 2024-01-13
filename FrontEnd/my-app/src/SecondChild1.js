import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleUserMessageChange = (e) => {
        setUserMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (userMessage.trim() === '') {
            return;
        }

        // Add user message to chat history
        setChatHistory([...chatHistory, { role: 'user', message: userMessage }]);

        // Clear the user input
        setUserMessage('');

        // Send user message to Flask API
        try {
            const response = await axios.post('http://127.0.0.1:5000/gh', userMessage);
            const aiResponse = response.data.response; 
            console.log(aiResponse)
            setChatHistory([...chatHistory, { role: 'ai', message: aiResponse }]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div> 
           <div class=" m-4">
           <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`message ${chat.role}`}>
                        {chat.message}
                    </div>
                ))}
            </div>
           </div>
           <div class=" fixed bottom-10 w-full p-5 text-center my-5 rounded-3xl ">
           <div className="user-input">
                <input 
                class="bg-white rounded-full h-5 mx-10 w-4/6 p-4"
                    type="text"
                    placeholder="Type a message..."
                    value={userMessage}
                    onChange={handleUserMessageChange}
                />
                <button class="bg-white rounded-full w-0.5/6 p-4" onClick={handleSendMessage}>Send</button>
            </div>
           </div>
            
        </div>
    );
};

export default Chat;