import { Sidebar, FriendList } from '../components'
import './cssPages/main.css'

function Friend(){
    return(
        <main>
            <Sidebar/>
            <FriendList/>
        </main>
    )
}

export default Friend