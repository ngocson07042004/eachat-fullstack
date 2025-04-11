import { createContext, useState } from 'react'

export const AppContext = createContext()

export default function AppProvider({ children }){
    const [isShowNewChat, setIsShowNewChat] = useState(false)
    const [isShowToast, setIsShowToast] = useState(false)

    return(
        <AppContext.Provider value={{ isShowNewChat, setIsShowNewChat, isShowToast, setIsShowToast }}>
            {children}
        </AppContext.Provider>
    )
}