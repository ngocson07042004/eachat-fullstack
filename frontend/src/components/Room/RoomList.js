import { NavLink } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context'
import Info from '../Info'
import './css/RoomList.css'

function RoomList(){
    const { user } = useContext(AuthContext)
    const [auth, setAuth] = useState([])
    
    useEffect(() => {
        if (Array.isArray(user) && user.length > 0) {
            const uniqueRooms = user.filter((item, index, self) =>
                index === self.findIndex(t => t.hashRoom === item.hashRoom)
            )
            setAuth(uniqueRooms)
        }
    }, [user])

    return(
        <div className="room-list">
            <details>
                <summary>Danh sách các phòng</summary>
                {auth.map((item, index) =>(
                    <NavLink 
                        key={index} 
                        to={`/chat/${item.hashRoom}`} 
                        state={{
                            hashRoom: item.hashRoom,
                            roomName: item.roomname,
                        }}
                        className="room"
                    >
                        <Info roomName={item.roomname}/>
                    </NavLink>
                ))}
            </details>
        </div>
    )
}

export default RoomList
//Hiển thị tên phòng và mỗi phòng chỉ hiện 1 lần