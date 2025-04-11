import { useEffect, useState } from 'react'
import { useDataGlobal } from '../../hooks'
import { setLogin } from '../../pages/Login'
import FormSearch from '../FormSearch'
import './css/HeaderRoom.css'

function HeaderRoom(){
    const { user, setIsShowNewChat } = useDataGlobal()
    const [isShowMenu, setIsShowNewMenu] = useState(false)
    const [auth, setAuth] = useState({})

    // Lấy user đã được đăng nhập
    useEffect(() =>{
        if(user)
            setAuth(user.find(item => item.username === setLogin.user))
    }, [user])
    
    return(
        <div className="header-room">
            <div className="header-title">
                <h2>Đoạn chat</h2>
                <button type="button" id="btn-menu" onClick={() => setIsShowNewMenu(!isShowMenu)}>
                    <i className="fa-solid fa-bars"></i>
                </button>

                <ul className="menubar" style={{ display: isShowMenu ? "block" : "none" }}>
                    <li>
                        <i className="fa-solid fa-user"></i>
                        <span>Hồ sơ cá nhân</span>
                    </li>

                    <li onClick={() => setIsShowNewChat(true)}>
                        <i className="fa-regular fa-square-plus"></i>
                        <span>Tin nhắn mới</span>
                    </li>

                    <li>
                        <img src={`http://localhost:8081/users/${auth.avatar}`} alt="Avatar" />
                        <button type="button" id="btn-logout" onClick={() => window.location.href = "/"}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </li>
                </ul>
            </div>

            <FormSearch placeholder={"Tìm kiếm trên EaChat..."}/>
        </div>
    )
}

export default HeaderRoom