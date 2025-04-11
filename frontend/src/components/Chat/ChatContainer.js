import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import { setLogin } from '../../pages/Login'
import { useDataGlobal, useAxios } from '../../hooks'
import HeaderChat from './HeaderChat'
import ChatWindow from './ChatWindow'
import InputText from './InputText'
import './css/ChatContainer.css'

const socket = io('http://localhost:8081')

function ChatContainer(){
    const { user }= useDataGlobal()
    const [chats, setChats] = useState([])
    const location = useLocation()
    const { roomid } = location.state || {}
    const [auth, setAuth] = useState({})

    const { data } = useAxios(`http://localhost:8081/chat/${roomid}`)
    
    const username = useMemo(() => setLogin.user, [])

    // Cập nhật auth và chats nếu có sự thay đổi từ user và data
    useEffect(() => {
        //Kiểm tra user && data có dữ liệu
        if(user && data){
            setAuth(user.find(item => item.username === setLogin.user))
            setChats(data)
        }
    }, [user, data])
    
    // Cập nhật tin nhắn khi có sự thay đổi roomid và username
    useEffect(() => {
        // Rời phòng cũ nếu có
        if (socket.roomid && socket.roomid !== roomid){
            socket.emit("leave", socket.roomid)
        }

        if(roomid){
            //Gửi tên người dùng roomid để thêm ra phòng với sự kiện "join"
            socket.emit("join", { user: username, roomid: roomid })
            socket.roomid = roomid
    
            // Lấy dữ liệu từ sự kiện "receiver"
            socket.on("receiver", data => {
                if(data.sender_id !== username) setChats(prev => [...prev, data])
            })
                
            return() =>{
                socket.off("receiver")
                socket.off("leave")
            }
        }
    }, [roomid, username])

    return(
        <div className="chat-container">
            {roomid ? <div className="chat-window-content">
                <HeaderChat/>
                <ChatWindow chats={chats}/>
                <InputText users={user} setChats={setChats} username={username}/>
            </div> 
            : 
            <div className="no-chat">
                <p>
                    Xin chào bạn <strong>{auth.lastname} {auth.name}</strong> quay trở lại với Eachat!<br/>
                    Chúc bạn một ngày mới vui vẻ!
                </p>
            </div>}
        </div>
    )
}

export default ChatContainer