import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import axios from 'axios'
import './cssPages/signup.css'

function SignUp(){
    document.title = "Đăng ký"
    let loginNav = useNavigate()

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
        if(username !== "" && password === corfimPassword && password !== "" && corfimPassword !== ""){
            axios.post('http://localhost:8081/signup', {username, password, corfimPassword})
            .then(res => {
                if(res.data === "Failed") alert("Tài khoản đã tồn tại!")
                else{
                    loginNav("/login")
                    alert("Đăng ký thành công!")
                }
                setUsername("")
                setPassword("")
                setCorfimPassword("")
            })
            .catch(err => console.log(err))
        }
        else if(username !== "" && password !== corfimPassword){
            alert("Mật khẩu không khớp!")
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
            <div className="form-group-signup">
                <div className="title-form">
                    <i className="fa-solid fa-user"></i>
                    <h5>Đăng ký</h5> 
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
                                placeholder="Mật khầu"
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                                id="password"
                                name="password"
                            />

                            <button type="button" className="btn-hidden" onClick={handlerClick1}>
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
                                name="cofimPassword"
                            />

                            <button type="button" className="btn-hidden" onClick={handlerClick2}>
                                <i 
                                    className={show2 === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                ></i>
                            </button>
                        </div>
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn-submit" onClick={handlerSubmit}>Đăng ký</button>
                        <span className="link" onClick={() => {loginNav("/login")}}>Đăng nhập</span>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignUp