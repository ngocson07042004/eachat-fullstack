import React from 'react'
import './css/FormSeach.css'

function FormSearch({ placeholder, value, handleChange }){
    return(
        <div className="form-search">
            <div className="input-group">
                <div className="icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <input 
                    type="search" 
                    name="search" 
                    id="search" 
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                />
            </div>
         </div>
    )
}

export default React.memo(FormSearch)