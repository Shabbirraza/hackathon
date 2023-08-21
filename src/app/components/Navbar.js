'use client'
import Link from 'next/link'
import React from 'react'
import { auth } from '../config/Config'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation';


const Navbar = ({ username, pathname, userId }) => {
  const router = useRouter();

  return (
    <div className='w-full bg-purple-900 pr-[30px]  pl-[70px] pb-[10px] pt-[10px] flex flex-col  items-center justify-center gap-5 md:flex-row md:justify-between'>
      <h3 className='m-0 text-white font-bold text-2xl text-center p-4'>Personal Blogging App</h3>
      {username ? <div className=' font-bold text-white text-center p-4 text-2xl'><Link href="/Profile">{username}</Link></div> :
        pathname == '/Login' ?<div> <span className='m-0 mx-4 font-bold text-white'><Link href="/">HomeScreen</Link></span><span className='m-0 font-bold text-white'><Link href="/SignUp">SignUp</Link></span></div>
          :
          pathname == '/Profile'? <div className='m-0 font-bold text-2xl text-white text-center '><Link href="/">Dashboard</Link>
          </div>:
          <span className='m-0 font-bold text-white'><Link href="/Login">Login</Link>
          </span>
      }
      {userId ? <div className='p-4 bg-red-900 text-white font-semibold cursor-pointer rounded-xl w-[40%] md:w-auto m-auto text-center '
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
      >SignOut</div> : null}
      {pathname == '/Profile' ?<span className='m-0 font-bold text-white'><Link href="/">{username}</Link></span>:null }

    </div>
  )
}

export default Navbar