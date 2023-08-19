'use client'
import Link from 'next/link'
import React from 'react'
import { auth } from '../config/Config'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation';


const Navbar = ({ username, pathname, userId }) => {
  const router = useRouter();

  return (
    <div className='w-screen bg-purple-900 pr-[70px] pl-[70px] pb-[10px] pt-[10px] flex justify-between items-center'>
      <h3 className='m-0 text-white font-bold text-xl '>Personal Blogging App</h3>
      {username ? <span className='m-0 font-bold text-white'><Link href="/Profile">{username}</Link></span> :
        pathname == '/Login' ?<div> <span className='m-0 mx-4 font-bold text-white'><Link href="/">HomeScreen</Link></span><span className='m-0 font-bold text-white'><Link href="/SignUp">SignUp</Link></span></div>
          :
          pathname == '/Profile'? <span className='m-0 font-bold text-white'><Link href="/">Dashboard</Link>
          </span>:
          <span className='m-0 font-bold text-white'><Link href="/Login">Login</Link>
          </span>
      }
      {userId ? <button className='p-2 bg-red-900 text-white font-semibold rounded'
        onClick={(userId) => {
          console.log(auth)
          signOut(auth).then(() => {
            console.log('hello')


            router.push('/Login');
            // window.location.reload()
          }).catch((error) => {
            console.log(error)
          });
        }}
      >SignOut</button> : null}
      {pathname == '/Profile' ?<span className='m-0 font-bold text-white'><Link href="/">{username}</Link></span>:null }

    </div>
  )
}

export default Navbar