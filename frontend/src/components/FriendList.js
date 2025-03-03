import HeaderContent from './HeaderContent'
import './css/default.css'

function FriendList(){
    return(
        <div className="container-friens container">
            <HeaderContent name="Bạn bè"/>
            <div className="friens-list list"></div>
        </div>
    )
}

export default FriendList