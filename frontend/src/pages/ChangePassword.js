import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import axios from 'axios'
import './cssPages/changePassword.css'

function ChangePassword(){
    document.title = "Đổi mật khẩu"

    const loginNav = useNavigate()

    const usernameRef = useRef()

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [corfimPassword, setCorfimPassword] = useState('')

    const handlerClick1 = () =>{
        if(!show1) setShow1(true)
        else setShow1(false)
    }

    const handlerClick2 = () =>{
        if(!show2) setShow2(true)
        else setShow2(false)
    }

    const handlerSubmit = () =>{
        if(username !== "" && password === corfimPassword){
            axios.post('http://localhost:8081/change-password', {password, corfimPassword, username})
            .then(res => {
                if(res.data === "Error"){         
                    alert("Đổi mật khẩu thất bại!")
                    setUsername("")
                    setPassword("")
                    setCorfimPassword("")
                }
                else{
                    alert("Đổi mật khẩu thành công!")
                    loginNav("/login") 
                }
            })
            .catch(err => console.log(err))
        }
        else if(username !== "" && password !== corfimPassword){
            alert("Mật khẩu không khớp!")
            setUsername("")
            setPassword("")
            setCorfimPassword("")
        }
        else{
            alert("Tên đăng nhập hoặc mật không thể rỗng!")
            usernameRef.current.focus()
            setUsername("")
            setPassword("")
            setCorfimPassword("")
        }
    }

    return(
        <main>
            <div className="form-group-change">
                <div className="title-form">
                    <i className="fa-solid fa-user"></i>
                    <h5>Đổi mật khẩu</h5> 
                </div>

                <div className="input-group">
                    <div className="username input-data">
                        <div className="icon">
                            <i className="fa-solid fa-user"></i> 
                        </div>

                        <input 
                            type="text"
                            id="username"
                            placeholder="Tên đăng nhập"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
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
                                type={show1 === true ? "text" : "password"}
                                value={password}
                                placeholder="Mật khầu mới"
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                                id="password"
                            />

                            <button className="btn-hidden" onClick={handlerClick1}>
                                <i 
                                    className={show1 === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                ></i>
                            </button>
                        </div>
                    </div>

                    <div className="password input-data">
                        <div className="password-show">
                            <div className="icon">
                                <i className="fa-solid fa-lock"></i> 
                            </div>

                            <input 
                                type={show2 === true ? "text" : "password"}
                                value={corfimPassword}
                                placeholder="Nhập lại mật khầu"
                                onChange={(e) => setCorfimPassword(e.target.value)} 
                                required
                                id="cofimPassword"
                            />

                            <button className="btn-hidden" onClick={handlerClick2}>
                                <i 
                                    className={show2 === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                ></i>
                            </button>
                        </div>
                    </div>

                    <div className="btn-group">
                        <button className="btn-submit" onClick={handlerSubmit}>Đổi mật khẩu</button>
                        <span className="link" onClick={() => {loginNav("/login")}}>Đăng nhập</span>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ChangePassword