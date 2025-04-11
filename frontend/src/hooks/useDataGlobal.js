import { useContext } from 'react'
import { AuthContext, AppContext } from '../context'

// Lấy các data toàn chương trình
function useDataGlobal(){
    const { user, setUser } = useContext(AuthContext)
    const { isShowNewChat, setIsShowNewChat, isShowToast, setIsShowToast } = useContext(AppContext)

    return { 
        user, 
        setUser, 
        isShowNewChat, 
        setIsShowNewChat, 
        isShowToast, 
        setIsShowToast,
    }
}

export default useDataGlobal