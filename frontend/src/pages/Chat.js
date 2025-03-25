import { ChatContainer, RoomContainer, Sidebar } from '../components';
import './cssPages/Chat.css'

export default function Chat(){
    document.title="EaChat"

    return(
        <div className="container">  
            <Sidebar/>
            <RoomContainer/>
            <ChatContainer/>
        </div>
    )
} 