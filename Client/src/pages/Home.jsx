import React from "react";
import { Link } from "react-router-dom";
import ChannelMin from "../components/molecules/ChannelMin";
import img from "../asset/img/image.jpg"
const Home = ({socket}) => {

    const users = [

        {
            lastName:"Grunblatt",
            firstName:"Cyprien",        
            lastMessage:"Une équipe à étée envoyée au mc do Lobeau avec",
            img: img,
            id: "1234"
        },         {
            lastName:"Bernardo",
            firstName:"Bernard",
            lastMessage:"Le poulet est cuit",
            img: img,
            id: "1234"
        }

    ]


    return (
        <div className='home'>
            <button onClick={() => {
                socket.emit("creatConversation", {name: "nom"})
            }}>
                Créer une conv
            </button>
            <h1> Chat </h1>
            {
                users.map( (user, i)=>{
                    return <Link to={`/channel/${user.id}`} key={i}>
                        <ChannelMin 
                            lastName={user.lastName} 
                            firstName={user.firstName} 
                            lastMessage={user.lastMessage}
                            image={user.img} />
                    </Link>
                })
            }
        </div>
    );
};

export default Home;