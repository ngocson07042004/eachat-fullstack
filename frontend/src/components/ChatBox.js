import './css/chatbox.css'

function ChatBox({ chats, currentUser }){
    const SenderChat = ({ avatar, message }) =>{
        return(
            <li className="sender">
                <img src={avatar} alt="Avatar" />
                <p>{message}</p>
            </li>
        )
    }

    const ReceiverChat = ({ avatar, message }) =>{
        return(
            <li className="receiver">
                <p>{message}</p>
                <img src={avatar} alt="Avatar" />
            </li>
        )
    }

    return(
        <>
            <ul className="messages">
                {chats.map((chat, index) =>{
                    if(chat.Username === currentUser){
                        return <SenderChat 
                        key={index}
                        message = {chat.message}
                        avatar = {chat.Avatar}/>
                    }
                    else{
                        return <ReceiverChat 
                        key={index}
                        message = {chat.message}
                        avatar = {chat.avatar}/>
                    }
            })}
            </ul>
        </>
    )
}

export default ChatBox