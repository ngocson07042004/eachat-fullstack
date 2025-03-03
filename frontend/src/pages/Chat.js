import { useParams } from 'react-router-dom'
import { Sidebar, ChatList, ChatWindow } from '../components'
import './cssPages/main.css'

function Chat(){
    document.title = "EaChat"

    const { id }= useParams()

    const NoChat = () =>{
        return(
            <div className="no-chat">
                <h4>Bạn chưa có đoạn chat nào!</h4>
            </div>
        )
    }

    return(
        <main>
            <Sidebar/>
            <ChatList/>
            {id ? <ChatWindow/> : <NoChat/>}
        </main>
    )
}

export default Chat