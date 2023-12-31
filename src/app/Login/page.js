'use client'
import React from 'react'
import SubNavbar from '../components/SubNavbar/page'
import Navbar from '../components/Navbar'
import { usePathname } from 'next/navigation'
import { auth } from '../config/Config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Login = () => {
    const pathname = usePathname()
    const router = useRouter()

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let [successMsg, setsuccessMsg] = useState('')
    let [errorMsg, setErrorMsg] = useState('')
    console.log(auth.currentUser)
    setTimeout(() => {
        console.log(auth.currentUser)
        if (auth.currentUser == null) {
           
        }
        else {
            router.push("/")
        }
    }, 500);
    return (
        <div className=' h-screen'>
            <Navbar pathname={pathname}/>
            <SubNavbar path="Login" />
            {errorMsg ? <div className='m-auto w-[400px]  bg-red-500 text-white font-semibold rounded-lg p-4'>{errorMsg}</div> : null}
            <div className='w-full   flex justify-center items-start   '>
                <form className='w-[300px]  shadow-2xl p-[25px] flex flex-col justify-center items-center mt-24 rounded-lg gap-y-3 bg-white'>
                    <input placeholder='Email' className='p-[10px] outline-purple-900 rounded-lg'
                        onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    <input placeholder='Password' className='p-[10px] outline-purple-900 rounded-lg '
                        onChange={(e) => { setPassword(e.target.value) }} value={password} type='password'/>
                    <button className='p-[10px] bg-purple-900 rounded-lg text-white  font-semibold'
                        onClick={(e) => {
                            e.preventDefault()

                            signInWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    // Signed in 
                                    const user = userCredential.user;

                                    setsuccessMsg("login sucess")
                                    setEmail('')
                                    setPassword('')
                                    setErrorMsg('')
                                    setTimeout(() => {
                                        router.push('/');
                                    }, 2000);

                                    // ...
                                })
                                .catch((error) => {
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    console.log(errorMessage)
                                    setErrorMsg(errorMessage)
                                    setTimeout(() => {
                                        setErrorMsg('')
                                    }, 2000);
                                });

                            console.log(email, password)
                        }}
                    >Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login