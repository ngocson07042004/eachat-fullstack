import { useContext, useState } from 'react'
import { AppContext } from '../../context'
import './css/addRoom.css'

function AddRoom(){
    const { isVisible, setIsVisible } = useContext(AppContext)
    const [choose, setChoose] = useState("yes")
    const [isShowPassword, setIsShowPassword] = useState(true)
    const [password, setPassword] = useState("")

    const handlerChangeSelect = (e) =>{
        setChoose(e.target.value)
        if(choose === "yes"){
            setIsShowPassword(false)
        } 
        else if(choose === "no"){
            setIsShowPassword(true)
            setPassword("")
        }
    }

    return(
        <div className="container-add-room" style={{ display: isVisible ? "block" : "none" }}>
            <form>
                <div className="title">
                    <h3>Tạo phòng</h3>
                    <button type="button" id="btn-close" onClick={() => setIsVisible(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="room-name input-group">
                    <label htmlFor="name-room">Tên phòng:</label><br/>
                    <input 
                        type="text" 
                        name="name-room" 
                        id="name-room"
                        placeholder="Thêm phòng..."
                        required
                    />
                </div>

                <div className="room-password input-group">
                    <label htmlFor="choose">Đặt mật khẩu: </label>
                    <select name="choose" id="choose" onChange={handlerChangeSelect}>
                        <option value="yes">Có</option>
                        <option value="no">Không</option>
                    </select>
                    <div className="password-group" style={{ display: isShowPassword ? "block" : "none" }}>
                        <input
                            type="text" 
                            name="password" 
                            id="password"
                            placeholder="Mật khẩu..."
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button type="submit">Thêm phòng</button>
            </form>
        </div>
    )
}

export default AddRoom