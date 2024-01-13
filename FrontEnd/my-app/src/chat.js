// src/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [input, setInput] = useState(''); 
  const [user, setuser] = useState(input);
  const [messages, setMessages] = useState([]);

  const addMessage = (text, sender) => {
    setMessages([...messages, { text, sender }]);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!input) return;
    
    addMessage(input, 'user');

    try { 
        setuser(input)
      const response = await axios.post('http://127.0.0.1:5000/gh', { message: input }); 
      console.log(response.data)
      addMessage(response.data, 'bot'); 
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chatbot">
      <div class="flex flex-col items-start" className="messages">
        {messages.map((message, index) => (
          <div class=" bg-white rounded-full p-4" key={index} className={`message ${message.sender}`}> 
          <div class=" bg-white rounded-full p-4">{user} </div> 
          
          <div class=" bg-white rounded-full p-4">{message.text}  </div>
            
           
          </div>
        ))}
      </div>
      
      <div class=" fixed bottom-10 w-full p-5 text-center my-5 rounded-3xl ">
           <div className="user-input">
                <input 
                class="bg-white rounded-full h-5 mx-10 w-4/6 p-4"
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={handleInputChange}
                />
                <button class="bg-white rounded-full w-0.5/6 p-4" onClick={handleSendMessage}>Send</button>
            </div>
           </div>
    </div>
  );
}

export default Chatbot;
