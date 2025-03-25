import { useContext, useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AuthContext } from '../context'
import { setLogin } from '../pages/Login'
import './css/Sidebar.css'

function Sidebar(){
    const { user } = useContext(AuthContext)
    const [auth, setAuth] = useState({})
    
    useEffect(() => {
        setAuth(user.find(item => item.username === setLogin.user))
    }, [user])

    return(
        <div className="sidebar">
            <ul>
                <li><NavLink to="/chat"><i className="fa-solid fa-comment"></i></NavLink></li>
                <li><NavLink to="archived"><i className="fa-solid fa-box-archive"></i></NavLink></li>
            </ul>
            
            <Link to="/auth" className="user"><img src={auth.avatar} alt="avatar"/></Link>
        </div>
    )
}

export default Sidebar