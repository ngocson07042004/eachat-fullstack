import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useDataGlobal } from '../hooks'
import { Toast }from '../components'
import './cssPages/signup.css'

function SignUp(){  
    document.title = "Đăng ký"
    const { setUser, setIsShowToast } = useDataGlobal()
    const loginNav = useNavigate()

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6rKwDbEN_M9FCcve-ozbDkUUn6VkEZ7xfVw&s")
    const [toast, setToast] = useState({
        icon: "",
        title: "",
        message: "",
    })

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        corfimPassword: "",
        avatar: "",
        name: "",
        lastname: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
    })

    const handleChange = (e) =>{
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value.trim() })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if(file){
            setFormData({ ...formData, avatar: file })
            setAvatarPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, password, corfimPassword } = formData

        if (username && password === corfimPassword){
            if(password !== corfimPassword){
                setToast({
                    icon: "danger",
                    title: "Thất bại",
                    message: "Thông tin không chính xác!"
                })
                setIsShowToast(true)
            } 

            else{
                const data = new FormData()
                for (let key in formData)
                    data.append(key, formData[key])

                try{
                    const res = await axios.post("http://localhost:8081/signup", data)
                    if(res.data === "Failed" || res.data === "Error"){
                        setToast({
                            icon: "warning",
                            title: "Cảnh báo",
                            message: "Đã tồn tại tài khoản này!"
                        })
                    setIsShowToast(true)
                    }
                    else{
                        setUser(prev => [...prev, formData])
                        setToast({
                            icon: "success",
                            title: "Thành công",
                            message: "Đăng ký thành công!"
                        })
                        setIsShowToast(true)
                        loginNav("/")
                        setAvatarPreview("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6rKwDbEN_M9FCcve-ozbDkUUn6VkEZ7xfVw&s")
                    }
                }
                catch(err){
                    console.error(err)
                }
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group-signup">
                    <div className="title-form">
                        <div className="img-info">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <label htmlFor="file-avatar">
                                <i className="fa-solid fa-camera"></i>
                            </label>

                            <input
                                type="file"
                                name="avatar"
                                id="file-avatar"
                                accept=".png, .jpeg, .jpg"
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>
                        <h1>Đăng ký</h1>
                    </div>

                    <div className="input-group">
                        <div className="lastname input-data">
                            <div className="icon">
                                <i className="fa-solid fa-user"></i>
                            </div>

                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Họ đệm"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="name input-data">
                            <div className="icon">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Tên"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="dateOfBirth input-data">
                            <div className="icon">
                                <i className="fa-solid fa-calendar"></i>
                            </div>

                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="phone input-data">
                            <div className="icon">
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength={10}
                                required
                            />
                        </div>

                        <div className="gender input-data">
                            <label htmlFor="gender">
                                <i className="fa-solid fa-venus-mars"></i>
                            </label>

                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>

                        <div className="username input-data">
                            <div className="icon"><i className="fa-solid fa-user"></i></div>
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
                                    id="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="button" className="btn-hidden" onClick={() => setShow1(!show1)}>
                                    <i className={show1 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                                </button>
                            </div>
                        </div>

                        <div className="password input-data">
                            <div className="password-show">
                                <div className="icon"><i className="fa-solid fa-lock"></i></div>
                                <input
                                    type={show2 ? "text" : "password"}
                                    id="corfimPassword"
                                    name="corfimPassword"
                                    placeholder="Nhập lại mật khẩu"
                                    value={formData.corfimPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="button" className="btn-hidden" onClick={() => setShow2(!show2)}>
                                    <i className={show2 ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                                </button>
                            </div>
                        </div>

                        <div className="btn-group">
                            <button type="submit" className="btn-submit">Đăng ký</button>
                            <Link to="/" className="link">Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            </form>

            <Toast icon={toast.icon} title={toast.title} message={toast.message}/>
        </>
    )
}

export default SignUp