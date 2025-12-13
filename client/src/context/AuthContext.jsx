import { createContext, useState } from "react"
import { restaurants } from "../assets/assets";

export const  AuthContext = createContext()

export const AppContextProvider = (props) => {
    const [authState, setAuthState] = useState({
        email: 'example@gmail.com',
        password: '12345678'
    });

    const value = {
        authState,
        setAuthState,
        restaurants 
    }

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}

