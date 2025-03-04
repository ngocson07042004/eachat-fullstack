import { createContext, useState } from 'react'
import useAxios from '../hooks/useAxios'


export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const { data } = useAxios("http://localhost:8081/chat")
    const [user, setUser] = useState([])

    if(user){
        setUser(data)
        return
    }

    return(
        <AuthProvider.Provider value={{ user }}>
            {children}
        </AuthProvider.Provider>
    )
}