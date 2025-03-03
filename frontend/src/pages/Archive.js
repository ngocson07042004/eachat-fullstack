import { Sidebar, ArchiveList } from '../components'
import './cssPages/main.css'

function Archive(){
    return(
        <main>
            <Sidebar/>
            <ArchiveList/>
        </main>
    )
}

export default Archive