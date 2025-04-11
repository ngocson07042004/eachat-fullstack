import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useDataGlobal } from '../hooks'
import './cssPages/login.css'
import { Toast }from '../components'
import axios from 'axios'

export const setLogin = {
    user: "Đăng nhập",
    state: false,
}

function Login(){
    document.title = "Đăng nhập hệ thống"

    const usernameRef = useRef()
    const ChatNav = useNavigate()
    const { setIsShowToast } = useDataGlobal()
  
    const [showPassword, setShowPassword] = useState(false)
    const [toast, setToast] = useState({
        icon: "",
        title: "",
        message: "",
    })
    
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) =>{
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value.trim() })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const { username, password } = formData

        if(username !== "" && password !== ""){     
            try{
                const res = await axios.post("http://localhost:8081", formData)

                if(res.data === "Success"){
                    setToast({
                        icon: "success",
                        title: "Thành công",
                        message: "Đăng nhập thành công!"
                    })
                    ChatNav("/chat")
                    setLogin.user = username
                    setLogin.state = true
                    setIsShowToast(true)
                }
                else{
                    setToast({
                        icon: "danger",
                        title: "Thất bại",
                        message: "Thông tin không chính xác!"
                    })
                    setFormData({
                        username: "",
                        password: "",
                    })
                    setIsShowToast(true)
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                                value={formData.username} 
                                onChange={handleChange}
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
                                    value={formData.password}
                                    placeholder="Mật khẩu"
                                    onChange={handleChange} 
                                    required
                                    id="password"
                                    name="password"
                                />

                                <button type="button" className="btn-hidden" onClick={() => setShowPassword(!showPassword)}>
                                    <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                                </button>
                            </div>
                            <span className="link"><Link to="/change-password">Quên mật khẩu?</Link></span>
                        </div>

                        <div className="btn-group">
                            <button type="submit" className="btn-submit">Đăng nhập</button>
                            <Link to="/signup" className="link">Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </form>

            <Toast icon={toast.icon} title={toast.title} message={toast.message}/>
        </>
    )
}

export default Login