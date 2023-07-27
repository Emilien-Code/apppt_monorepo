import React from "react";
import "../../asset/styles/atoms/message.scss"

const Message = (props) => {
    const { children, sender } = props
    return <p className={`message ${sender}`}>
        {children}
    </p>
}

export default Message