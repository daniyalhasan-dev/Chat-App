import { createContext, useState } from "react";
import { auth, db } from "../config/firebase"
import { getDoc , doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) =>{

    const [userData,setUserData] = useState(null);
    const [chatData,setChatData] = useState(null);

    const navigate = useNavigate();


    const loaduserData = async (uid) => {
        try {
            const userRef = doc(db,"users",uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            setUserData(userData);
            if (userData.name) {
                navigate('/chat')
            }
            else {
                navigate('/profile')
            }
            setInterval( async () => {
                if (auth.chatUser) {
                    await updateDoc(userRef,{
                    lastSeen:Date.now()
            })
                }
            }, 60000);

        } catch (error) {
            
        }
    }


    const value = {
        userData,setUserData,
        chatData,setChatData,
        loaduserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider