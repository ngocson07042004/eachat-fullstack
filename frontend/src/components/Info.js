import { useContext, useEffect, useState } from "react"
import "./css/Info.css"
import { AuthContext } from "../context"

function Info({ roomName, moreAvatar }){  
    const { user } = useContext(AuthContext)
    const [imgs, setImgs] = useState([])

    useEffect(() => {
        if (Array.isArray(user) && user.length > 0) {
            const avatars = user.filter(user => user.roomname === roomName)
            .map(user => user.avatar)
            setImgs(avatars)
        }
    }, [user, roomName])
    
    return(
        <div className="info">
            <div className="img-list">
                {imgs.slice(0, 2).map((item, index) => (
                    <img key={index} src={item} alt="avatar"/>
                ))}
                {imgs.length > 2 ? <span className="more-avatar">+{imgs.length - 2}</span> : <span></span>}
            </div>

            <div className="info-title">
                <h5>{roomName}</h5>
                {moreAvatar ? <span className="more-avatar">{`${imgs.length} người`}</span> : <span></span>}
            </div>
        </div>
    )
}

export default Info