import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import './css/InputText.css'

const socket = io('http://localhost:8081')

function InputText({ users, setChats, username }){
    const [message, setMessage] = useState("")
    const [auth, setAuth] = useState({})
    const location = useLocation()
    const { roomid } = location.state || {}

    useEffect(() => {
        if(users){
            //Lấy ra object có username trùng với tên đăng nhập
            setAuth(users.find(item => item.username === username))
        }
    }, [users, username])
    
    const handleSendMessage = e => {
        e.preventDefault()
        
        if(message){
            const d = new Date() // Khởi tạo ngày giờ gửi
            const date = d.toISOString() // Lấy ngày
            const time = d.toTimeString().split(' ')[0].slice(0, 5) // Lấy giờ
    
            const msg = {
                room_id: roomid,
                sender_id: username,
                content: message,
                avatar: auth.avatar,
                lastname: auth.lastname,
                name: auth.name,
                date,
                time,
            }
            
            // Gửi dữ liệu từ sự kiện "sender"
            socket.emit("sender", msg)
            
            // Nạp dữ liệu vào chats
            setChats(prev => [...prev, {
                username,
                avatar: auth.avatar,
                name: auth.name,
                lastname: auth.lastname,
                content: message,
                date,
                time,
            }])

            // Xoá ô nhập tin nhắn
            setMessage("")
        }
    }
    
    return (
        <div className="input-text">
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    name="chat"
                    id="chat"
                    value={message}
                    placeholder="Aa"
                    onChange={(e) => setMessage(e.target.value)}
                ></input>
                
                <button type="submit">
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </div>
    )
}

export default React.memo(InputText)