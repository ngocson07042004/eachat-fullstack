import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { setLogin } from '../pages/Login'
import HeaderContent from './HeaderContent'
import './css/default.css'

const hashCode = (length) =>{
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        result += characters[index];
    }
    return result
}

function ChatList(){
    const [user, setUser] = useState([])

    useEffect(() =>{
        axios.get("http://localhost:8081/chat")
        .then(res => setUser(res.data.filter(item => item.Username !== setLogin.user)))
        .catch(err => console.log(err))
    }, [])

    return(
        <div className="container-chat container">
            <HeaderContent name="Đoạn chat"/>
            <div className="chat-list list">
                <ul className="chats">
                    {user.map((item, index) =>(
                        <li key={index}>
                            <Link to={`/chat/${hashCode(25)}`}
                            state={{
                                user: item.Username,
                                Name: `${item.LastName} ${item.Name}`,
                                avatar: item.Avatar,
                            }}>
                                <img src={item.Avatar} alt="Avatar" />
                                <div className="info">
                                    <h5>{item.LastName + " " + item.Name}</h5>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ChatList