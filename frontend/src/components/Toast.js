import React, { useEffect, useMemo, useState } from 'react'
import './css/Toast.css'
import { useDataGlobal } from '../hooks'

function Toast({ icon, title, message }){
    const { isShowToast, setIsShowToast } = useDataGlobal()
    const [progress, setProgress] = useState(100)

    useEffect(() => {
        if (!isShowToast) return

        setProgress(100)

        const start = Date.now()
        const duration = 4000

        const interval = setInterval(() => {
            const elapsed = Date.now() - start
            const percent = Math.max(100 - (elapsed / duration) * 100, 0)
            setProgress(percent)

            if (elapsed >= duration) {
                clearInterval(interval)
                setIsShowToast(false)
            }
        }, 50)

        return () => clearInterval(interval)
    }, [isShowToast, setIsShowToast])

    const setIcon = useMemo(() => {
        const action = icon.toLowerCase()
        switch(action.trim()){
            case "warning":
                return{
                    color: "rgb(133, 196, 38)",
                    icon:"fa-solid fa-circle-exclamation",
                }

            case "error":
                return{
                    color: "red",
                    icon: "fa-solid fa-circle-xmark",
                }

            case "success":
                return{
                    color: "rgb(133, 196, 38)",
                    icon: "fa-solid fa-circle-check",
                }

            default:
                return{
                    color: "rgb(133, 196, 38)",
                    icon: "fa-solid fa-circle-check",
                }
        }
    }, [icon])

    return(
        <div 
            className="toast" 
            style={{ transform: isShowToast ? "translate(-50%, 0%)" : "translate(-50%, -200%)"}}
        >
            <div className="toast-info">
                <div className="toast-icon">
                    <i className={setIcon.icon} style={{ color: setIcon.color }}></i>
                </div>

                <div className="toast-title">
                    <h4 style={{ color: setIcon.color }}>{title}</h4>
                    <p>{message}</p>
                </div>

                <button type="button" id="btn-close" onClick={() => setIsShowToast(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div
                className="toast-time"
                style={{
                    width: `${progress}%`,
                    height: "2px",
                    backgroundColor: setIcon.color,
                    transition: "width 50ms linear",
                }}
            ></div>
        </div>
    )
}

export default React.memo(Toast)