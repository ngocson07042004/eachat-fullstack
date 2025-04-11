import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Login, ChangePassword, SignUp, Chat } from './pages'
import Provider from './context'
import { NewChat  } from './components'

export default function App(){
    return(
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/change-password" element={<ChangePassword/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/chat" element={<Chat/>}/>
                    <Route path="/chat/:id" element={<Chat/>}/>
                </Routes>
                <NewChat/>
            </BrowserRouter>
        </Provider>
    )
}
