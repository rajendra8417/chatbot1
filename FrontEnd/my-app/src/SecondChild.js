import React, { useState } from 'react';
import axios from 'axios';
export function SecondChild() { 

    const [TotalMessages,SetTotal]=React.useState([]) 

    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleUserMessageChange = (e) => {
        setUserMessage(e.target.value);
    };

    async function handleSendMessage(){
        console.log() 

        
       
       
        const collectionOfMessages = [...TotalMessages,  userMessage];
        setUserMessage('');
        //var voicedata=await obj.blob()
        
        console.log(userMessage)
        try{ 
            console.log(userMessage)
            const res = await axios.post('http://127.0.0.1:5000/gh', { message: userMessage }); 
            console.log(res)

                setChatHistory([...chatHistory, { role: 'ai', message: res }]); 
                collectionOfMessages.push(res);
        
        } 
        catch(e){
            console.log(e)
        }   
            
       
        
        setChatHistory(collectionOfMessages)
        console.log(collectionOfMessages)
        console.log(TotalMessages) 
    }

    return (
        <>

          
                <div class=" m-4">
                    <div class="flex flex-col items-end">
                        <p class="text-white bg-blue-500 rounded-full p-4"> {userMessage} </p>
                    </div>
                    <div class="flex flex-col items-start">
                        <p class="text-blue-500 bg-white rounded-full p-4"> {chatHistory }</p>
                    </div>
                </div>
                <div class=" fixed bottom-10 w-full p-5 text-center my-5 rounded-3xl "> 
                {/* <input class="bg-white rounded-full h-5 mx-10 w-4/6 p-4" placeholder="Type a message..." >   */}
                <input 
                class="bg-white rounded-full h-5 mx-10 w-4/6 p-4" 
                placeholder="Type a message..."
                type="text"
                name="text" 
                value={userMessage} 
                onChange={handleUserMessageChange}
                 />
                <button 
                
                onClick={handleSendMessage}
                        class="bg-white rounded-full w-0.5/6 p-4">
                        <p>send</p>
                    </button>
                </div>

       

        </>
    )
} 
