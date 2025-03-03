import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import ChatBox from './ChatBox'
import HeaderChatList from './HeaderChatList'
import './css/chatWindow.css'
import { useLocation, useParams } from 'react-router-dom'

const socket = io("http://localhost:8081")

function ChatWindow(){
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    //const [iconButton, setIconButton] = useState("fa-solid fa-thumbs-up")
    
    const location = useLocation()
    const { user, Name } = location.state

    const { id } = useParams()
    let roomName = id

    let username = user
    document.title = `${Name} |EaChat`

   useEffect(() => {
    if (username && roomName)
        // Gửi tên người dùng và tên phòng đến server để tham gia vào phòng
        socket.emit("join", { username: username, room: roomName })

    // Lắng nghe sự kiện 'receiver' và cập nhật tin nhắn
    socket.on("receiver", (data) => {
        // Chỉ cập nhật tin nhắn nếu đó không phải là tin nhắn của chính người gửi
        if (data.username !== username)
        setMessages((prev) => [...prev, data])
    })

    return () => {
      socket.off("receiver"); // Dọn dẹp khi component unmount
    }
  }, [username, roomName])
    
    const getMessage = (e) =>{
        setMessage(e.target.value)
        // if(e.target.value.length >= 1) setIconButton("fa-solid fa-paper-plane")
        // else setIconButton("fa-solid fa-thumbs-up")
    }

    const sendMessage = (e) =>{
        e.preventDefault();
        if (message.trim()) {
            const msg = { Name, message, roomName };
    
            // Gửi tin nhắn đến server
            socket.emit("send", msg);
    
            // Cập nhật tin nhắn ở phía client ngay lập tức (cho người gửi)
            setMessages((prev) => [...prev, { Name, message }]);
    
            // Reset input sau khi gửi tin nhắn
            setMessage("");
        }
    }

    return(
        <div className="container-window">
            <div className="header-window">
                <HeaderChatList user={Name}/>
            </div>

            <div className="chat-window">
                <ChatBox chats={messages} currentUser={Name}/>
            </div>

            <div className="footer-window">
                <form className="input-action" onSubmit={sendMessage}>
                    <div className="input-file">
                        <label htmlFor="file"><i className="fa-solid fa-file"></i></label>
                        <input
                            type="file"
                            name="file" 
                            id="file"
                            hidden multiple
                        />
                    </div>
                    
                    <div className="input-mess">
                        <input
                            type="text"
                            placeholder="Aa" 
                            id="mess"
                            name="mess"
                            maxLength="100"
                            value={message}
                            onChange={getMessage}
                        />
                    </div>

                    <div className="btns">
                        <button type="submit" className="btn-submit">
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChatWindow