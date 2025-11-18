import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase"
import { getDoc , doc, updateDoc, onSnapshot } from "firebase/firestore";
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
                if (auth.currentUser) {
                    await updateDoc(userRef,{
                    lastSeen:Date.now()
            })
                }
            }, 60000);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if (userData) {
            const chatRef = doc(db,'chats',userData.id);
            const unSub = onSnapshot(chatRef, async (res)=>{
                const chatItmes = res.data().chatsData;
                const tempData = [];
                for (const item of chatItmes) {
                    const userRef = doc(db,'users',item.rId);
                    const userSnap = await getDoc(userRef);
                    const userData = userSnap.data();
                    tempData.push({...item,userData})
                }
                setChatData(tempData.sort((a,b)=>b.updatedAt - a.updatedAt))
            })


            return () => {
                unSub();
            }



        }
    },[userData])


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