import { useContext } from 'react'
import { AppContext } from '../../context'
import './css/HeaderRoom.css'

function HeaderRoom(){
    const { setIsVisible } = useContext(AppContext)
    return(
        <header>
            <div className="header-title">
                <h2>Đoạn chat</h2>
                <button type="button" onClick={() => setIsVisible(true)}>
                    <i className="fa-regular fa-square-plus"></i>
                </button>
            </div>

            <form className="form-search">
                <div className="input-group">
                    <input 
                        type="text" 
                        name="search" 
                        id="search" 
                        placeholder="Tìm kiếm trên EaChat..." 
                        maxlength="30"
                    />
                    <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </form>
        </header>
    )
}

export default HeaderRoom