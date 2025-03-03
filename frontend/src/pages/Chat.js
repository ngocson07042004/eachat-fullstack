import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Sidebar, ChatList, ChatWindow } from '../components'
import axios from 'axios'
import { setLogin } from './Login'
import './cssPages/main.css'

function Chat(){
    document.title = "EaChat"

    const { id }= useParams()
    const [user, setUser] = useState({})

    useEffect(() =>{
        const getData = async() =>{
            const res = await axios.get('http://localhost:8081/chat')
            try{
                setUser(res.data.find(item => item.Username === setLogin.user))
            }catch(err){
                console.log(err)
            }
        }
        getData()
    }, [user])

    const NoChat = () =>{
        return(
            <div className="no-chat">
                <p>
                    Xin chào <strong>{user.LastName + " " + user.Name}</strong> đã quay trở lại <strong>EaChat</strong>!<br/>
                    Bạn chưa có đoạn chat nào!
                </p>
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