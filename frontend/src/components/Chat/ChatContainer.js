import { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../context'
import { setLogin } from '../../pages/Login'
import './css/ChatContainer.css'
import HeaderChat from './HeaderChat'
import ChatWindow from './ChatWindow'
import InputText from './InputText'
import './css/ChatWindow.css'
import './css/InputText.css'

function ChatContainer(){
    const { user }= useContext(AuthContext)
    const location = useLocation()
    const { hashRoom } = location.state || {}
    const [auth, setAuth] = useState({})

    useEffect(() => {
        if(user){
            setAuth(user.find(item => item.username === setLogin.user))
        }
    }, [user])

    return(
        <div className="chat-container">
            {hashRoom ? <div className="chat-window-content">
                <HeaderChat/>
                <ChatWindow/>
                <InputText/>
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