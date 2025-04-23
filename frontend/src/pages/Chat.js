import { useLocation, useParams } from 'react-router-dom'
import { ChatContainer, RoomContainer, Toast } from '../components'
import './cssPages/Chat.css'
import { setLogin } from './Login'
import { useEffect, useState } from 'react'

function Chat(){
    const location = useLocation()
    const { id } = useParams()
    const { roomName } = location.state || {}
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576)

    // Xử lý kích thước màn hình
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576)
        }
        
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    document.title = id ? `${roomName} | EaChat` : "EaChat"

    return(
        <>
            <div className="container">
                {isMobile ? (
                    id ? <ChatContainer /> : <RoomContainer />
                ) : (
                    <>
                        <RoomContainer />
                        <ChatContainer />
                    </>
                )}
            </div>
            {setLogin.state ? <Toast icon="success" title="Thành công" message="Đăng nhập thành công!" /> : ""}
        </>
    )
}

export default Chat