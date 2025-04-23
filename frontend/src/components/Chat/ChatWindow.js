import React, { useCallback, useDeferredValue } from 'react'
import { setLogin } from '../../pages/Login'
import './css/ChatWindow.css'

function ChatWindow({ chats }){
    const defferdChats = useDeferredValue(chats)

    //Định dạng thời gian VD: 1 ngày, 1 giây trước,...
    const formatDateTime = useCallback(dateStr => {
        const rtf = new Intl.RelativeTimeFormat("vi", { numeric: "auto" })
    
        const now = Date.now()
        const past = new Date(dateStr)
        const diffInSeconds = Math.floor((now - past) / 1000)
    
        const ranges = [
            { unit: "year", seconds: 31536000 },
            { unit: "month", seconds: 2592000 },
            { unit: "day", seconds: 86400 },
            { unit: "hour", seconds: 3600 },
            { unit: "minute", seconds: 60 },
            { unit: "second", seconds: 1 },
        ]
    
        for(let range of ranges) {
            let diff = Math.floor(diffInSeconds / range.seconds)
            if(Math.abs(diff) >= 1){
                return rtf.format(-diff, range.unit)
            }
        }
    
        return "Vừa xong"
    }, [])  
    
    return(
        <div className="chat-window">
            <ul>
                {defferdChats && defferdChats.length > 0 ?
                defferdChats.map((item, index) => {
                    const isSender = item.username === setLogin.user
                    const showAvatar = index === 0 || defferdChats[index - 1].username !== item.username

                    return(
                        <li key={index} className={isSender ? "sender" : "receiver"}>
                            <div className="chat">
                                <img
                                    src={`http://localhost:8081/users/${item.avatar}`}
                                    alt="avatar"
                                    className="avatar"
                                    style={{ visibility: showAvatar ? "visible" : "hidden" }}
                                />
                                
                                <div className="info">
                                    <p className="bubble">{item.content}</p>
                                    <span className="time">{`${formatDateTime(item.created_at)}`}</span>
                                </div>
                            </div>
                        </li>
                    )}) : (
                        <li className="new-chat">Giờ đây có thể trò chuyện với nhau!</li>
                    )}
            </ul>
        </div>
    )
}

export default ChatWindow