import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './cssPages/changePassword.css'
import { Toast } from '../components'
import axios from 'axios'

function ChangePassword() {
    document.title = "Đổi mật khẩu"

    const loginNav = useNavigate()

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        corfimPassword: "",
    })

    const [toast, setToast] = useState({
        icon: "",
        title: "",
        message: "",
    })

    const handleChange = e => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value.trim() })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const { username, password, corfimPassword } = formData

        if(!username || !password || !corfimPassword){
            setToast({
                icon: "warning",
                title: "Cảnh báo",
                message: "Vui lòng nhập đầy đủ thông tin!",
            })
            return
        }

        if(password !== corfimPassword){
            setToast({
                icon: "warning",
                title: "Cảnh báo",
                message: "Mật khẩu không khớp!",
            })
            setFormData({
                username: "",
                password: "",
                corfimPassword: "",
            })
            return
        }

        try{
            const res = await axios.post("http://localhost:8081/change-password", formData)

            if (res.data === "Success"){
                setToast({
                    icon: "success",
                    title: "Thành công",
                    message: "Đổi mật khẩu thành công!",
                })
                setTimeout(() => loginNav("/"), 1000)
            } 
            else{
                setToast({
                    icon: "error",
                    title: "Thất bại",
                    message: "Đổi mật khẩu thất bại!",
                })
                setFormData({
                    username: "",
                    password: "",
                    corfimPassword: "",
                })
            }
        } 
        catch (err){
            console.log(err)
            setToast({
                icon: "error",
                title: "Lỗi hệ thống",
                message: "Không thể kết nối đến máy chủ!",
            })
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
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
                                name="username"
                                placeholder="Tên đăng nhập"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="password input-data">
                            <div className="password-show">
                                <div className="icon">
                                    <i className="fa-solid fa-lock"></i>
                                </div>
                                <input
                                    type={show1 ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    placeholder="Mật khẩu mới"
                                    onChange={handleChange}
                                    required
                                    id="password"
                                />
                                <button
                                    type="button"
                                    className="btn-hidden"
                                    onClick={() => setShow1(!show1)}
                                >
                                    <i className={show1 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                                </button>
                            </div>
                        </div>

                        <div className="password input-data">
                            <div className="password-show">
                                <div className="icon">
                                    <i className="fa-solid fa-lock"></i>
                                </div>
                                <input
                                    type={show2 ? "text" : "password"}
                                    name="corfimPassword"
                                    value={formData.corfimPassword}
                                    placeholder="Nhập lại mật khẩu"
                                    onChange={handleChange}
                                    required
                                    id="corfimPassword"
                                />
                                <button
                                    type="button"
                                    className="btn-hidden"
                                    onClick={() => setShow2(!show2)}
                                >
                                    <i className={show2 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                                </button>
                            </div>
                        </div>

                        <div className="btn-group">
                            <button type="submit" className="btn-submit">Đổi mật khẩu</button>
                            <Link to="/" className="link">Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </form>

            <Toast icon={toast.icon} title={toast.title} message={toast.message} />
        </>
    )
}

export default ChangePassword