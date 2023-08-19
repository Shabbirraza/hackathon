'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import { onAuthStateChanged, unsubscribe ,updatePassword} from 'firebase/auth'
import { useState } from 'react'
import SubNavbar from '../components/SubNavbar/page'
import { auth } from '../config/Config'
import { useRouter } from 'next/navigation'

const Profile = () => {
    let [oldPassword, setOldPassword] = useState("")
    let [newPassword, setNewPassword] = useState("")
    let [checkpass, setCheckpass] = useState('')
    let [user, setUser] = useState('')
    const router = useRouter()

    setTimeout(() => {
        console.log(auth.currentUser)
        if (auth.currentUser == null) {
            router.push("/Login")
        }
        else {
            setUser(auth.currentUser)
        }
    }, 1000);
let changePass=()=>{
    if (newPassword == checkpass) {
        const password = newPassword;

        updatePassword(user, password).then(() => {
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
        <div className='h-screen bg-blue-200'>
            <Navbar pathname='/Profile'/>
            <SubNavbar />
            <div className='ml-[70px] mt-[5px] w-[70%] rounded-lg p-[10px] text-white font-semibold bg-red-500'>To change Password logout and login again</div>
            <div className='ml-[70px] mt-[20px] w-[70%] rounded-lg p-[10px] bg-white gap-y-2  flex flex-col justify-start  '>
                <div className='w-[150px] h-[150px] bg-black rounded-lg'></div>
                <span className='font-extrabold text-xl'>Shabbir</span>
                <span className='font-extrabold text-xl'>Password</span>
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
    )
}

export default Profile