'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import { onAuthStateChanged, unsubscribe, updatePassword } from 'firebase/auth'
import { useState } from 'react'
import SubNavbar from '../components/SubNavbar/page'
import { auth } from '../config/Config'
import { useRouter } from 'next/navigation'
import { db } from '../config/Config'
import { getDoc, doc } from 'firebase/firestore'
// import{}

const Profile = () => {
    let [oldPassword, setOldPassword] = useState("")
    let [newPassword, setNewPassword] = useState("")
    let [checkpass, setCheckpass] = useState('')
    let [user, setUser] = useState('')
    let [newUser, setnewUser] = useState('')
    let [imageUrl, setImageUrl] = useState("")

    const router = useRouter()


    const [currentUserStatus, setcurrentUserStatus] = useState(false)

    setTimeout(async () => {
        console.log(auth.currentUser)
        if (auth.currentUser == null) {
            router.push("/Login")
        }
        else {
            console.log(auth.currentUser.uid)
            setUser(auth.currentUser.email)
            setnewUser(auth.currentUser)

            console.log(newUser)



            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data().imageUrl);
                setImageUrl(docSnap.data().imageUrl)
                setcurrentUserStatus(true)


            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
    }, 500);
    let changePass = () => {
        if (newPassword == checkpass) {
            const password = newPassword;

            updatePassword(newUser, password).then(() => {
                // Update successful.
                console.log("password updated")
            }).catch((error) => {
                // An error ocurred
                // ...
                console.log(error)
            });
        }

    }

    return (
        <>
            {currentUserStatus == false ? <div className='w-screen min-h-screen bg-blue-200  flex justify-center items-center'>
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span
                    >
                </div>
            </div> :
                <div className='h-screen bg-blue-200'>
                    <Navbar pathname='/Profile' />

                    <div className='ml-[20px] md:ml-[70px] mt-[5px] w-[70%] rounded-lg p-[10px] text-white font-semibold bg-red-500'>To change Password logout and login again</div>
                    <div className='ml-[20px] md:ml-[70px] mt-[20px] w-[90%] md:w-[70%] rounded-lg p-[15px] pl-[20px] bg-white gap-y-2  flex flex-col justify-start  '>
                        <img src={imageUrl} className='w-[100px] h-[100px]  rounded-lg'></img>
                        <span className='font-extrabold text-xl'>{user}</span>
                        <span className='font-extrabold text-xl'>Change Password</span>
                        <input placeholder='Old Password' className='p-[10px] w-[190px] outline-purple-900 rounded-lg'
                            onChange={(e) => { setOldPassword(e.target.value) }}
                            value={oldPassword}
                            type='password'
                        />
                        <input placeholder='Password' className='p-[10px] w-[190px] outline-purple-900 rounded-lg '
                            onChange={(e) => { setNewPassword(e.target.value) }}
                            value={newPassword}
                            type='password'
                        />
                        <input placeholder='repeat Password' className='p-[10px] w-[190px] outline-purple-900 rounded-lg '
                            onChange={(e) => { setCheckpass(e.target.value) }}
                            value={checkpass}
                            type='password'
                        />
                        <button className='pt-[10px] pb-[10px] w-[180px] pr-5 pl-5 bg-purple-900 rounded-lg text-white  font-semibold'
                            onClick={() => changePass()}
                        >Update Password</button>

                    </div>
                </div>

            }

        </>
    )
}

export default Profile