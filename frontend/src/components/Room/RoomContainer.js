import RoomList from './RoomList'
import HeaderRoom from './HeaderRoom'
import './css/RoomContainer.css'

function RoomContainer(){
    return(
        <div className="room-container">
            <HeaderRoom/>
            <RoomList/>
        </div>
    )
}

export default RoomContainer