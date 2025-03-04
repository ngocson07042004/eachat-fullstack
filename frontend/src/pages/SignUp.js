import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import useAxios from '../hooks/useAxios'
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

    const { data, isLoading } = useAxios(
        "http://localhost:8081/signup",
        "post",
        {username, password, corfimPassword}
    )

    const handlerSubmit = (e) =>{
        e.preventDefault()

        if(username !== "" && password === corfimPassword && password !== "" && corfimPassword !== ""){
            if(data === "Failed") alert("Tài khoản đã tồn tại!")
            else{
                loginNav("/")
                alert("Đăng ký thành công!")
            }
            setUsername("")
            setPassword("")
            setCorfimPassword("")
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
        <form onSubmit={handlerSubmit}>
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
                                type={show1 === true ? "text" : "password"}
                                value={password}
                                placeholder="Mật khầu"
                                onChange={(e) => setPassword(e.target.value.trim())} 
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
                                onChange={(e) => setCorfimPassword(e.target.value.trim())} 
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
                        <button type="submit" className="btn-submit" disabled={isLoading}>Đăng ký</button>
                        <Link to="/" className="link">Đăng nhập</Link>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SignUp