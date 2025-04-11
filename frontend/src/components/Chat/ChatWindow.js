import React, { useCallback, useDeferredValue } from 'react'
import { setLogin } from '../../pages/Login'
import './css/ChatWindow.css'

function ChatWindow({ chats }){
    const defferdChats = useDeferredValue(chats)

    //Định dạng lại dd-mm-yyyy
    const formatDate = useCallback((dateStr) => {
        const date = new Date(dateStr)
        const DateTime = {
            day: String(date.getUTCDate()).padStart(2, "0"),
            month: String(date.getUTCMonth() + 1).padStart(2, "0"),
            year: date.getUTCFullYear(),
        }
        
        const { day, month, year } = DateTime
        return `${day}-${month}-${year}`
    }, [])
    
    return(
        <div className="chat-window">
            <ul>
                {defferdChats && defferdChats.length > 0 ?
                    defferdChats.map((item, index) =>{
                        const isSender = item.username === setLogin.user
                        return(
                            <li key={index} className={isSender ? "sender" : "receiver"}>
                                <div className="chat">
                                    <img 
                                        src={`http://localhost:8081/users/${item.avatar}`} 
                                        alt="avatar" 
                                    />
                                    <div className="info">
                                        <h4>{`${item.lastname} ${item.name}`}</h4>
                                        <p>{item.content}</p>
                                        <span>{`${formatDate(item.date)} ${item.time}`}</span>
                                    </div>
                                </div>
                            </li>
                        )
                }) : (
                    <li className="new-chat">Giờ đây có thể trò chuyện với nhau!</li>
                )}
            </ul>
        </div>
    )
}

export default ChatWindow