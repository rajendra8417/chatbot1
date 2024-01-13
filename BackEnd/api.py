from  flask import Flask, request, jsonify,Response
import openai
import json
import requests 
from flask_cors import CORS
app=Flask("rishu")  
CORS(app)
@app.route("/gh",methods=["POST","GET"])
def home():
    openai.api_key="abc"
    
    
    FileTypeOfValue=request.data.decode('utf-8')
    print(FileTypeOfValue)
   
   
    NameOfFile = json.dumps(FileTypeOfValue) 
    print(NameOfFile)
    response=openai.ChatCompletion.create(
         model="gpt-3.5-turbo",
    messages=[

          {"role": "user", "content": NameOfFile},

      ]
    )

    answerFromChatGPT=response["choices"][0]["message"]["content"] 
    return jsonify(answerFromChatGPT)
   
    
    return "hello"
app.run(debug=True)
