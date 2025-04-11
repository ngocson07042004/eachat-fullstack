import React from 'react'
import './css/FormSeach.css'

function FormSearch({ placeholder, value, handleChange }){
    return(
        <div className="form-search">
            <div className="input-group">
                <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                    maxlength="30"
                />
            </div>
         </div>
    )
}

export default React.memo(FormSearch)