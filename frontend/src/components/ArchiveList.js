import HeaderContent from './HeaderContent'
import './css/default.css'

function ArchiveList(){
    return(
        <div className="container-archive container">
            <HeaderContent name="Kho lưu trữ"/>
            <div className="archive-list list"></div>
        </div>
    )
}

export default ArchiveList