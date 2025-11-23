import React, { useContext, useState } from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase"
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const {userData, chatData, chatUser, setChatUser, messagesId, setMessagesId} = useContext(AppContext)
  const data = useContext(AppContext)
  const [user,setUser] = useState(null);
  const [showSearch,setShowSearch] = useState(false);
console.log("messagesId",messagesId)
  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const useRef = collection(db, "users");
        const q = query(useRef, where("username", "==",input.toLowerCase()));
        const querySnap = await getDocs(q);
        console.log("asad",querySnap)
        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          let userExist = false
          chatData.map((user)=>{
            if (user.rId === querySnap.docs[0].data().id) {
              userExist = true
            }
          })
          if (!userExist) {
            setUser(querySnap.docs[0].data());
          }
        }
        else {
          setUser(null)
        }
      }
      else {
        setShowSearch(false)
      }
    } catch (error) {}
  }

  const addChat = async () => {
    const messageRef = collection(db,'messages');
    const chatsRef = collection(db,'chats');
    try {
      const newMessageRef = doc(messageRef);

      await setDoc(newMessageRef,{
        createAt:serverTimestamp(),
        messages:[]
      })

      await updateDoc(doc(chatsRef,user.id),{
        chatsData:arrayUnion({
          messageId:newMessageRef.id,
          lastMessage:"",
          rId:userData.id,
          updatedAt:Date.now(),
          messageSeen:true
        })
      })


      await updateDoc(doc(chatsRef,userData.id),{
        chatsData:arrayUnion({
          messageId:newMessageRef.id,
          lastMessage:"",
          rId:user.id,
          updatedAt:Date.now(),
          messageSeen:true
        })
      })



    } catch (error) {
      toast.error(error.message);
      console.log(error);
      
    }
  }

  const setChat = async (item) =>{
    setMessagesId(item.messageId);
    setChatUser(item)
  }

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className="logo" alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Edit Profile
              </p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input onChange={inputHandler} type="text" placeholder="Search Here ...." />
        </div>
      </div>
      <div className="ls-list">
        {showSearch && user
        ? <div onClick={addChat} className="friends add-user">
          <p>{user.name}</p>
        </div>
        : (chatData || []).map((item, index) => (
            <div onClick={()=>setChat(item)} className="friends" key={index}>
              <img src={assets.profile_img} alt="" />
              <div>
                <p>{item.userData.name}</p>
                <span>{item.lastMessage}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
