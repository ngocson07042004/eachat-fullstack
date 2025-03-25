import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { setLogin } from '../../pages/Login'
import './css/ChatWindow.css'

function ChatWindow(){
    const [chats, setChats] = useState([])
    const location = useLocation()
    const { hashRoom } = location.state || {}
    const { data } = useAxios(
        `http://localhost:8081/chat/${hashRoom}`,
        "get",
        { hashRoom }
    )

    useEffect(() =>{
        if(data){
            setChats(data)
        }
    }, [data])

    return (
        <div className="chat-window">
            <ul>
                {chats && chats.length > 0 && chats.map((item, index) => {
                    const isSender = item.username === setLogin.user
                    return (
                        <li key={item.username} className={isSender ? "sender" : "receiver"}>
                            <div className="chat">
                                <img src={item.avatar || "default-avatar.png"} alt="avatar" />
                                <div className="info">
                                    <h4>{item.name || "Không xác định"}</h4>
                                    <p>{item.content || ""}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ChatWindow