import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
// import { db } from "../../config/firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBStEzW8IJEsKo4tiUFdBpANb6VwozecAg",
  authDomain: "chat--app-gs-202c5.firebaseapp.com",
  projectId: "chat--app-gs-202c5",
  storageBucket: "chat--app-gs-202c5.firebasestorage.app",
  messagingSenderId: "720417496025",
  appId: "1:720417496025:web:600a3dad1c0b42587857c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signup = async (username,email,password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            bio:"Hey, There I'm using Chat App",
            lastSeen:Date.now(),
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const resetPass = async (email) => {
    if (!email) {
        toast.error("Enter Your Email");
        return null;
    }
    try {
        const userRef = collection(db,'users');
        const q = query(userRef,where("email","==",email))
        const querySnap = await getDoc(q);
        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth,email);
            toast.success("Reset Email Sent")
        }
        else{
            toast.error("Email Doesn't Exist")
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message)
    }
}

export {signup, login, logout,auth,db,resetPass}