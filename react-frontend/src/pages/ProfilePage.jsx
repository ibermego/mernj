import React, {useEffect, useState} from "react";

const Profilepage = () => {

    const [isValidToken, setIsValidToken] = useState(false)
    
    useEffect(async ()=> {
        // fetch validate
        const response = await fetch("http://localhost/api/v1/login/validate")
        const data = await response.json()
        setIsValidToken(true)
    })
    
    
    return (
        <>
            {isValidToken && isValidToken ? 
                <h2>Profilepage</h2>
                : <h2>No logeado</h2>
            }
        </>
    )
}

export default Profilepage