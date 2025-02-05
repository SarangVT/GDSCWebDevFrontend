import React, { createContext, useContext, useState} from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    return (
        <UserContext.Provider value={{userName, setUserName, email, setEmail, name, setName}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserData = () => {
    const {userName, setUserName, email, setEmail, name, setName} = useContext(UserContext);
    return {userName, setUserName, email, setEmail, name, setName};
}