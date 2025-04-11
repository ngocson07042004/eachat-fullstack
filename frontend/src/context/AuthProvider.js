import { createContext, useEffect, useState } from 'react'
import { useAxios } from '../hooks'

export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const { data } = useAxios('http://localhost:8081/chat')
    const [user, setUser] = useState([])
    
    // Lấy các user từ data
    useEffect(() => {
        if(data){
            setUser(data)
        }
    }, [data])
    
    return(
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}