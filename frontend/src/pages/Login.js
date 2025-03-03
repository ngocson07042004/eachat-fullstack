import { useNavigate, Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import axios from 'axios'
import './cssPages/login.css'

export const setLogin = {
    user: "",
    state: false,
}

function Login(){
    document.title = "Đăng nhập hệ thống"
    
    let homeNav = useNavigate()
    let signUpNav = useNavigate()

    const usernameRef = useRef()

    const [showPasword, setShowPasword] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handlerClick = () =>{
        if(!showPasword) setShowPasword(true)
        else setShowPasword(false)
    }
     
    const handlerSubmit = (e) =>{
        e.preventDefault()
        
        if(username !== "" && password !== ""){
            axios.post('http://localhost:8081', {username, password})
            .then(res => {
                if(res.data === "Success"){
                    alert("Đăng nhập thành công!")
                    homeNav("/chat")
                    setLogin.user = username
                    setLogin.state = true
                }
                else{
                    alert("Thông tin không chính xác")
                    setUsername("")
                    setPassword("")
                }
            })
            .catch(err => console.log(err))
        }
        else{
            alert("Tên đăng nhập hoặc mật không thể rỗng!")
            usernameRef.current.focus()
            setUsername("")
            setPassword("")
        }
    }

    return(
        <main>
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
                                type={showPasword === true ? "text" : "password"}
                                value={password}
                                placeholder="Mật khầu"
                                onChange={(e) => setPassword(e.target.value.trim())} 
                                required
                                id="password"
                                name="password"
                            />

                            <button type="button" className="btn-hidden" onClick={handlerClick}>
                                <i 
                                    className={showPasword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                ></i>
                            </button>
                        </div>
                        <span className="link"><Link to="/change-password">Quên mật khẩu?</Link></span>
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn-submit" onClick={handlerSubmit}>Đăng nhập</button>
                        <span className="link" onClick={() => {signUpNav("/signup")}}>Đăng ký</span>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login