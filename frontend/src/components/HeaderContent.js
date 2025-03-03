import './css/headerContent.css'

function HeaderContent(props){
    return(
        <div className="header-content">
            <div className="header-title">
                <h2>{props.name}</h2>
            </div>

            <div className="input-group-header">
                <span><i class="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" placeholder="Tìm kiếm trên Easy Chat"/>
            </div>
        </div>
    )
}

export default HeaderContent