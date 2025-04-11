import { NavLink, useParams } from 'react-router-dom'
import React, { useDeferredValue, useEffect, useState } from 'react'
import { useDataGlobal } from '../../hooks'
import { setLogin } from '../../pages/Login'
import Info from '../Info'
import SHA256 from 'crypto-js/sha256'
import './css/RoomList.css'

function RoomList() {
    const { user } = useDataGlobal()
    const { id } = useParams()
    const [auth, setAuth] = useState([])
    const deferredAuth = useDeferredValue(auth)
    
    useEffect(() => {
        if (Array.isArray(user)){
            const filter = user.filter((value, index, self) => 
                index === self.findIndex(message => message.username === value.username && message.username !== setLogin.user))
            setAuth(filter)
        }
    }, [user])

    const createHashRoom = (user1, user2) => {
        return SHA256([user1, user2].sort().join("-")).toString()
    }

    return (
        <div className="room-list">
            <ul>
                {deferredAuth && deferredAuth.length > 0 ? (
                    deferredAuth.map((item, index) => {
                        const roomid = createHashRoom(setLogin.user, item.username)
                        return (
                            <li key={index} style={{ background: id === roomid ? "rgba(193, 188, 188, 0.5)" : "none" }}>
                                <NavLink
                                    to={`/chat/${roomid}`}
                                    state={{
                                        roomid,
                                        roomName: `${item.lastname} ${item.name}`,
                                        avatar: item.avatar,
                                    }}
                                    className="room"
                                >
                                    <Info 
                                        roomName={`${item.lastname} ${item.name}`} 
                                        image={item.avatar}
                                    />
                                </NavLink>
                            </li>
                        )
                    })
                ) : "Không có đoạn chat nào"}
            </ul>
        </div>
    )
}
export default React.memo(RoomList)