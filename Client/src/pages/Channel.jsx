import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import uid from "../asset/scripts/uid";
import Message from "../components/atoms/Message"
import SendBar from "../components/molecules/sendBar";
let blocks = [];


const EditablePage = ({ socket })=> {
  const params = useParams()
  
  const [ isFirstLoad, setIsFirstLoad ] = React.useState(true)
  const [ message, setMessage ] = React.useState("")
  
  const [ blockState, setBlockState ] = React.useState([])

  React.useEffect(() => {
    if(isFirstLoad) {
      socket.emit("getPage", {id: params.id})
      socket.on("getPage", (data)=>{
        setIsFirstLoad(false)

        blocks = data.content
      })
    }

    socket.on("updatePage", (data)=>{
      console.log(data)
      blocks = data.content.content
      setBlockState(data.content.content)
    })
}, [socket]);

  React.useEffect(()=>{

    setBlockState(blocks)

  }, [blocks])

  React.useEffect(()=>{

    setBlockState(blocks)

  }, [blockState])

  const sendMessage = ()=>{


    blocks.push({
      tag:"p",
      html: message,
      id: blocks.length + 1,
      user: "you"
    })

    setBlockState([])

    socket.emit("updatePage", {
      id: params.id,
      content: blocks,
      changedBlock: blocks.length + 1,
      user: "user1"
    })
    console.log("message", message)
  }

  return (
    <div className="Page" style={{
      display : "flex",
      flexDirection: "column",
    }}>
      {blockState.map((block, key) => {
        return (
          <Message key={key} sender={block.user}> {block.html} </Message>
        );
      })}
      
      <SendBar sendMessage={sendMessage} message={message} setMessage={setMessage}/>
    </div>
  );

}

export default EditablePage;
