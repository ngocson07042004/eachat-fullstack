import { useNavigate, Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import useAxios from '../hooks/useAxios'
import './cssPages/login.css'

export const setLogin = {
    user: "Đăng nhập",
    state: false
}

function Login(){
    document.title = "Đăng nhập hệ thống"
  
    const ChatNav = useNavigate()
  
    const usernameRef = useRef()
  
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handlerClick = () => {
        setShowPassword(!showPassword)
    }
    
    const { data, isLoading } = useAxios(
        "http://localhost:8081",
        "post",
        { username, password }
    )

    const handlerSubmit = async(e) =>{
        e.preventDefault()
        
        if(username !== "" && password !== "")
            if(data && data === "Success"){
                alert("Đăng nhập thành công!")
                ChatNav("/chat")
                setLogin.user = username
                setLogin.state = true
            }
            else{
                alert("Thông tin không chính xác")
                setUsername("")
                setPassword("")
        }else{
            alert("Tên đăng nhập hoặc mật khẩu không thể rỗng!")
            usernameRef.current.focus()
            setUsername("")
            setPassword("")
        }
    }

    return (
        <form onSubmit={handlerSubmit}>
            <div className="form-group-login">
                <div className="title-form">
                    <i className="fa-solid fa-user"></i>
                    <h5>Đăng nhập</h5> 
                </div>

                <div className="input-group">
                    <div className="username input-data">
                        <div className="icon">
                            <i className="fa-solid fa-user"></i> 
                        </div>

                        <input 
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Tên đăng nhập"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value.trim())}
                            ref={usernameRef}
                            required
                        />
                    </div>

                    <div className="password input-data">
                        <div className="password-show">
                            <div className="icon">
                                <i className="fa-solid fa-lock"></i> 
                            </div>

                            <input 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Mật khẩu"
                                onChange={(e) => setPassword(e.target.value.trim())} 
                                required
                                id="password"
                                name="password"
                            />

                            <button type="button" className="btn-hidden" onClick={handlerClick}>
                                <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                            </button>
                        </div>
                        <span className="link"><Link to="/change-password">Quên mật khẩu?</Link></span>
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn-submit" disabled={isLoading}>Đăng nhập</button>
                        <Link to="/signup" className="link">Đăng ký</Link>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login