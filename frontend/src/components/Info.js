import React from 'react'
import './css/Info.css'

function Info({ roomName, image }) {
    return (
        <div className="info">
            <div className="img-info">
                <img src={`http://localhost:8081/users/${image}`} alt="Avatar" />
            </div>

            <div className="info-title">
                <h4>{roomName}</h4>
            </div>
        </div>
    )
}

export default React.memo(Info)