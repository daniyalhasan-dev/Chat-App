import React, { useEffect, useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../config/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProfileUpdate = () => {


  const profileUpdate = (e) => {
    e.preventDefault();
    try {
      if (!name) {
        toast.error('Please add Your Name')
      }
      const docRef = doc(db,'users',user.uid);
      if (name) {
        updateDoc(docRef,{
          bio:bio,
          name:name
        })
      }
      else{
        updateDoc(docRef,{
          bio:bio,
        })
      }
    } catch (error) {
      
    }
  }


  // const [image,setImage] = useState(false)
  const [name,setName] = useState("");
  const [bio,setBio] = useState("");
  const [uid,setUid] = useState("");

  const navigate = useNavigate()


  useEffect(()=> {
    onAuthStateChanged(auth,async (user)=> {
      if (user) {
        setUid(user.uid)
        const docRef = doc(db,'users',user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().name) {
          setName(docSnap.data().name)
        }
        if (docSnap.data().bio) {
          setBio(docSnap.data().bio)
        }
        else {
          navigate('/')
        }
      }
    })
  })


  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile details</h3>
          {/* <label htmlFor="avatar">
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="avatar" accept='.png, .jpeg, jpg ' hidden />
            <img src={image ? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
            Upload Profile Image
          </label> */}
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Your Name'/>
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Write Profile Bio' required></textarea>
          <button className='btn' type='submit'>Save</button>
        </form>
        <img src={assets.logo_icon} className='profile-pic' alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate
