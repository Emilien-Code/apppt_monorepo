import React from "react";
import "../../asset/styles/molecules/channelMin.scss"
const ChannelMin = (props)=>{

    const { image, lastName, firstName, lastMessage } = props
    
    return <div className="channel-min">
        <picture>
            <img src={image} alt={`image de profile de ${lastName} ${firstName}`} />
        </picture>
        <div>
            <h2>{lastName} {firstName}</h2>
            <p> { lastMessage } </p>
        </div>
    </div>
}

export default ChannelMin