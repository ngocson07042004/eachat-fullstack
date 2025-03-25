import { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../hooks/useAxios'


export const AppContext = createContext()

export default function AppProvider({ children }){
    const { id } = useParams()
    const { data } = useAxios(`http://localhost:8081/chat/${id}`)
    const [chats, setChats] = useState([])
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if(chats)
            setChats(data)
    }, [data, chats])
    
    return(
        <AppContext.Provider value={{ chats, isVisible, setIsVisible }}>
            {children}
        </AppContext.Provider>
    )
}