import { NavLink, useParams } from 'react-router-dom'
import React, { useDeferredValue, useEffect, useState, useCallback } from 'react'
import SHA256 from 'crypto-js/sha256'
import { useDataGlobal } from '../../hooks'
import { setLogin } from '../../pages/Login'
import Info from '../Info'
import './css/RoomList.css'

function RoomList(){
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
    
    //Định dạng thời gian VD: 1 ngày, 1 giây trước...
    const formatDateTime = useCallback(dateStr => {
        const rtf = new Intl.RelativeTimeFormat("vi", { numeric: "auto" })

        const now = Date.now()
        const past = new Date(dateStr)
        const diffInSeconds = Math.floor((now - past) / 1000)

        const ranges = [
            { unit: "year", seconds: 31536000 },
            { unit: "month", seconds: 2592000 },
            { unit: "day", seconds: 86400 },
            { unit: "hour", seconds: 3600 },
            { unit: "minute", seconds: 60 },
            { unit: "second", seconds: 1 },
        ]

        for (let range of ranges) {
            let diff = Math.floor(diffInSeconds / range.seconds)
            if (Math.abs(diff) >= 1) {
                return rtf.format(-diff, range.unit)
            }
        }

        return "Vừa xong"
    }, [])   

    const createHashRoom = (user1, user2) => {
        return SHA256([user1, user2].sort().join("-")).toString()
    }

    return(
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
                                        content={`${item.lastname} ${item.name}: ${item.content}`}
                                        timer={formatDateTime(item.created_at)}
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