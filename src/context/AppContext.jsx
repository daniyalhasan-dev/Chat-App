import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) =>{

    const [userDate,setUserData] = useState(null);
    const [chatDate,setChatData] = useState(null);


    const value = {
        
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider