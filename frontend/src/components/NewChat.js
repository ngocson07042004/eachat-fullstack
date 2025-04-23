import React, { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import FormSearch from './FormSearch'
import { setLogin } from '../pages/Login'
import { useAxios, useDataGlobal } from '../hooks'
import './css/NewChat.css'

function NewChat(){
    const { isShowNewChat, setIsShowNewChat } = useDataGlobal()
    const { id } = useParams()
    const { data } = useAxios(`http://localhost:8081/api/users/${setLogin.user}`)
    const [auth, setAuth] = useState([]) // Danh sách tất cả người dùng
    const [searchQuery, setSearchQuery] = useState("")  // Từ khóa tìm kiếm
    const defferedAuth = useDeferredValue(auth)

    // Cập nhật danh sách bạn bè khi có sự thay đổi về data
    useEffect(() => {
        if(Array.isArray(data)){
            setAuth(data)
        }
    }, [data])

    // Hàm xử lý thay đổi giá trị tìm kiếm
    const handleChange = (e) => {
        setSearchQuery(e.target.value) 
    }

    // Hàm học các user theo searchQuery
    const filteredAuth = useMemo(() => {
        return defferedAuth.filter(item =>
            `${item.lastname} ${item.name}`.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    }, [searchQuery, defferedAuth])

    return(
        <div className="new-chat" id="overlay" style={{display: isShowNewChat ? "block" : "none"}}>
            <form>
                <div className="new-chat-header">
                    <h4>Tin nhắn mới</h4>
                    <button type="button" id="btn-close" onClick={() => setIsShowNewChat(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="input-group-auth">
                    <FormSearch 
                        placeholder={"Tìm kiếm bạn bè..."}
                        handleChange={handleChange}
                    />

                    <ul>
                        {filteredAuth && filteredAuth.length > 0 ? (
                            filteredAuth.map((item, index) => (
                                <li 
                                    key={index}
                                    style={{ background: id === item.hashRoom ? "rgba(193, 188, 188, 0.5)" : "none" }}
                                >
                                    <Link 
                                        to={`/chat/${item.hashRoom}`}
                                        state={{
                                            roomid: item.hashRoom,
                                            roomName: `${item.lastname} ${item.name}`,
                                            avatar: item.avatar,
                                        }}
                                        onClick={() => setIsShowNewChat(false)}
                                    >
                                       <img src={`http://localhost:8081/users/${item.avatar}`} alt="Avatar" />
                                       <span>{`${item.lastname} ${item.name}`}</span>
                                    </Link>
                                </li>
                            ))
                        ) : "Không có bạn bè nào!"}
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default React.memo(NewChat)