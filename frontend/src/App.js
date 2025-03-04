import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Login, ChangePassword, SignUp } from './pages/'
//import AuthProvider from './context/AppProvider'
//import "slick-carousel/slick/slick.css"
//import "slick-carousel/slick/slick-theme.css"

export default function App(){
    return(
        //<AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/change-password" element={<ChangePassword/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    {/* <Route path="/chat" element={<Chat/>}/>
                    <Route path="/chat/:id" element={<Chat/>}/> */}
                </Routes>
            </BrowserRouter>
        //</AuthProvider>
    )
}
