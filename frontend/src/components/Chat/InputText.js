import React, { useState } from 'react'
import './css/InputText.css'

function InputText({ onSendMessage }) {
    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.trim()) {
            onSendMessage(message)
            setMessage("")  // Reset sau khi gửi
        }
    }

    return (
        <div className="input-text">
            <form onSubmit={handleSubmit}>
                <textarea
                    name="chat"
                    id="chat"
                    rows={2}
                    value={message}
                    placeholder="Aa"
                    maxLength={180}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button type="submit">
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </div>
    )
}

export default InputText