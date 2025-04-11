import { useLocation, useParams } from 'react-router-dom';
import { ChatContainer, RoomContainer, Toast } from '../components';
import './cssPages/Chat.css'
import { setLogin } from './Login';

export default function Chat(){
    const location = useLocation()
    const { id } = useParams()
    const { roomName } = location.state || {}
    document.title = id ? `${roomName} | EaChat` : "EaChat"

    return(
        <>
            <div className="container">
                <RoomContainer/>
                <ChatContainer/>
            </div>
            {setLogin.state ? <Toast icon={"success"} title={"Thành công"} message={"Đăng nhập thành công!"}/> : ""}
        </>
    )
} 