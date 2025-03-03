import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Login, ChangePassword, SignUp, Chat, Friend, Archive } from './pages/'

//import "slick-carousel/slick/slick.css"
//import "slick-carousel/slick/slick-theme.css"

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/change-password" element={<ChangePassword/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/chat/:id" element={<Chat/>}/>
                <Route path="/friend" element={<Friend/>}/>
                <Route path="/archived" element={<Archive/>}/>
            </Routes>
        </BrowserRouter>
    )
}
