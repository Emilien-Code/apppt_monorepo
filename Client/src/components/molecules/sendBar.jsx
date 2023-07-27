import React from "react";

const SendBar = (props)=> {

    const { message ,setMessage, sendMessage } = props
    const input = React.useRef()

    const handleSendMessage = (e)=>{
        console.log("here")
        if(e === "click" || e.keyCode == 13){
            sendMessage();
            setMessage("")
        }
    }

    return <div className="sendBar" > 
        <input type="text" 
            ref={input}
            onKeyUp={(e)=>{handleSendMessage(e)}}
            value={message} 
            onChange={(e)=>setMessage(e.target.value)}
        />
        <button 
            onClick={()=>{handleSendMessage('click')}}
        >
            Envoyer
        </button>
    </div>
}

export default SendBar