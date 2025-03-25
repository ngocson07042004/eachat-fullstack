import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import useAxios from '../hooks/useAxios'
import './cssPages/changePassword.css'

function ChangePassword(){
    document.title = "Đổi mật khẩu"

    const loginNav = useNavigate()

    const usernameRef = useRef()

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [corfimPassword, setCorfimPassword] = useState("")

    const handlerClick1 = () =>{
        if(!show1) setShow1(true)
        else setShow1(false)
    }

    const handlerClick2 = () =>{
        if(!show2) setShow2(true)
        else setShow2(false)
    }

    const { data, isLoading } = useAxios(
        "http://localhost:8081/change-password",
        "post",
        {password, corfimPassword, username}
    )

    const handlerSubmit = (e) =>{
        e.preventDefault()

        if(username !== "" && password === corfimPassword){
            if(data && data === "Error"){         
                alert("Đổi mật khẩu thất bại!")
                setUsername("")
                setPassword("")
                setCorfimPassword("")
            }
            else{
                alert("Đổi mật khẩu thành công!")
                loginNav("/") 
            }
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
        <form onSubmit={handlerSubmit}>
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
                                placeholder="Mật khầu mới"
                                onChange={(e) => setPassword(e.target.value.trim())} 
                                required
                                id="password"
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
                            />

                            <button type="button" className="btn-hidden" onClick={handlerClick2}>
                                <i 
                                    className={show2 === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                ></i>
                            </button>
                        </div>
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn-submit" disabled={isLoading}>Đổi mật khẩu</button>
                        <Link to="/" className="link">Đăng nhập</Link>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ChangePassword