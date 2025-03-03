import { setLogin } from '../pages/Login'
import { useLocation } from 'react-router-dom'

function HeaderChatList(){
    const location = useLocation()
    const { Name, avatar } = location.state || {}

    return(
        <>
            <div className="user-img">
                    <img src={avatar} alt={Name} />
                </div>

                <div className="user-info">
                    <h4>{Name}</h4>
                    <span>{setLogin.state ? "Đang hoạt động" : "Không hoạt động"}</span>
                </div>
        </>
    )
}

export default HeaderChatList