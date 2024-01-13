from flask import Flask,request,Response
from flask_cors import CORS, cross_origin

import openai
import requests
flk=Flask("rishu")
CORS(flk)

@flk.route("/",methods=["POST","GET"])
@cross_origin()
def home():
    return "Home page"

@flk.route("/test",methods=["POST","GET"])
@cross_origin()
def test():
    return "ABC"

@flk.route("/rishu",methods=["POST","GET"])
def abc():
    FileTypeOfValue=request.files["file"] 
    NameOfFile=FileTypeOfValue.filename
    buffer=open(FileTypeOfValue.filename, "wb")
    buffer.write(FileTypeOfValue.read())
    buffer.close()
    fileopened=open(NameOfFile,"rb")
    # Insert your own OPENAI Account key below
    openai.api_key="your-own-account-key"
    # Insert your own OPENAI Organisation key below
    openai.organization="your-own-org-key"
    textquestion=openai.Audio.translate("whisper-1",fileopened)
    questionInTextForm=textquestion["text"]
    response=openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[

            {"role": "user", "content": questionInTextForm},

        ]
    )
    answerFromChatGPT=response["choices"][0]["message"]["content"]
    requestbody={
    "text": answerFromChatGPT,
    "model_id": "eleven_monolingual_v1",
    "voice_settings": {
        "stability": 0,
        "similarity_boost": 0,
        "style": 0,
        "use_speaker_boost": True
    }
    }
    requestheader={'accept': 'text','Content-Type': 'application/json','xi-api-key':"2ff9f149ebc4677cfd85ad287c8b0723"}
    # response=requests.post("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM?optimize_streaming_latency=0",
    #           json=requestbody,headers=requestheader)
    # fileopened=open("sample.mp3","wb")
    # fileopened.write(response.content)
    # fileopened.close()
    return Response("response.content",content_type='text')

flk.run()