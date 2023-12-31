'use client'
import { useState } from 'react'
import React from 'react'
import Navbar from '../components/Navbar'
import SubNavbar from '../components/SubNavbar/page'
import { useRouter } from 'next/navigation'
import { auth, db } from '../config/Config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, setDoc, doc } from "firebase/firestore";
import { storage } from '../config/Config'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



const SignUp = () => {
    let [firstname, setFirstname] = useState('')
    let [lastname, setLastname] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [repeatPassword, setRepeatPassword] = useState('')
    let [successMsg, setsuccessMsg] = useState('')
    let [errorMsg, setErrorMsg] = useState('')
    let [file, setfile] = useState(null)
    const router = useRouter();

    let handleChange = (e) => {
        console.log(e.target.files[0])
        setfile(e.target.files[0])

    }
    return (
        <div className='bg-white h-screen'>
            <Navbar />
            <SubNavbar path="SignUp" />

            {errorMsg ? <div className='m-auto w-[400px]  bg-red-500 text-white font-semibold rounded-lg p-4'>{errorMsg}</div> : null}
            <div className='w-full  bg-blue-200 flex justify-center items-start   '>

                <form autoComplete='off' className='w-[95%] sm:w-[400px] p-[25px] flex flex-col justify-center items-center mt-10 rounded-lg gap-y-3 bg-white'>
                    <input id="firstname" minLength="3" maxLength="20"
                        onChange={(e) => { setFirstname(e.target.value) }} value={firstname}
                        name='fname' type='text'
                        placeholder='Firstname' className='p-[10px] w-[75%] outline-purple-900 rounded-lg' required />
                    <input id="lastname" placeholder='lastname' minLength="1" maxLength="20"
                        name='lname' type='text'
                        onChange={(e) => { setLastname(e.target.value) }} value={lastname}
                        className='p-[10px] w-[75%] outline-purple-900 rounded-lg ' required />
                    <input id="email" placeholder='Email'
                        name='email' type='email'
                        onChange={(e) => { setEmail(e.target.value) }} value={email}
                        className='p-[10px] w-[75%] outline-purple-900 rounded-lg' required />
                    <input id="password" placeholder='Password' minLength="8"
                        name='password' type='password'
                        onChange={(e) => { setPassword(e.target.value) }} value={password}
                        className='p-[10px] w-[75%] outline-purple-900 rounded-lg ' required />
                    <input id="repeatPassword" placeholder='Repeat password'
                        type='password' name='repeatPassword'
                        onChange={(e) => { setRepeatPassword(e.target.value) }} value={repeatPassword}
                        className='p-[10px] w-[75%] outline-purple-900 rounded-lg ' required />
                    <input type='file' onChange={handleChange} placeholder='please enter file' />
                    <button type="submit" className='p-[10px] bg-purple-900 rounded-lg text-white  font-semibold'
                        onClick={(e) => {
                            e.preventDefault();
                            let picUrl
                            console.log(auth)
                            if (repeatPassword == password) {
                                createUserWithEmailAndPassword(auth, email, password)
                                    .then(async (userCredential) => {
                                        // Signed in 
                                        const user = userCredential.user;
                                        console.log(user.uid)
                                        console.log(user)
                                        const storageRef = ref(storage, `images/${user.email}`);
                                        // storageRef.snapshot.ref
                                        uploadBytes(storageRef, file).then((snapshot) => {
                                            console.log('Uploaded a blob or file!');
                                            getDownloadURL(ref(storage, storageRef))
                                                .then(async(url) => {
                                                    console.log(url)
                                                    picUrl = url
                                                    try {
                                                        let newData = {
                                                            userName: `${firstname + " " + lastname}`,
                                                            userEmail: email,
                                                            id: user.uid,
                                                            imageUrl: picUrl
                                                        }
                                                        console.log(newData)
                                                        await setDoc(doc(db, "users", user.uid), {
                                                            userName: `${firstname + " " + lastname}`,
                                                            userEmail: email,
                                                            id: user.uid,
                                                            imageUrl: picUrl
                                                            // UserPass: password,
                                                        })

                                                        setsuccessMsg("you have signed up sucesssfully");
                                                        console.log(successMsg)
                                                        setTimeout(() => {
                                                            setsuccessMsg('')
                                                            // redirect('/Login')
                                                            router.push('/Login');


                                                        }, 1500);
                                                    } catch (e) {
                                                        console.log("Error adding document: ", e);
                                                        setErrorMsg(e)
                                                    }

                                                })
                                        });


                                    })
                                    .catch((error) => {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;
                                        console.log(errorMessage);
                                        setErrorMsg(errorMessage);
                                        setTimeout(() => {
                                            setErrorMsg('')
                                        }, 2000);

                                    });
                            } else {
                                setErrorMsg("passwords dont match")
                                setTimeout(() => {
                                    setErrorMsg('')
                                }, 1500);

                            }


                        }}

                    >SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp