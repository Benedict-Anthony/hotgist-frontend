import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiFillFire, AiOutlineFileAdd, AiOutlineLogout } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { useRouter } from 'next/router'


const Header = () => {
    const [status, setStatus] = useState(false)
    const router = useRouter()

    const logOutUser = () => {
        localStorage.removeItem('token')
        setStatus(false)
        router.push("/")

    }

    useEffect(() => {
        setStatus(JSON.parse(localStorage.getItem('token') as any) ? true : false)
    }, [status, router.pathname])


    return (
        <header className='w-full flex justify-between align-center border-b-2 mb-10 absolute top-0 '>
            <div className="flex align-center justify-center text-red-500 logo">
                <h1 className="text-xl">Hot Gists </h1>
                <AiFillFire />
            </div>

            <nav className="justify-between align-center w-100 ">
                <ul className="hidden md:flex justify-between align-center space-x-6">
                    <li className='text-xl text-dark text-bold cursor-pointer hover:text-primary text-secondary'><Link href={"/"}>Home</Link></li>
                    <li className='text-xl text-dark text-bold cursor-pointer hover:text-primary text-secondary'><Link href={"/trending"}>Trending</Link></li>
                </ul>

            </nav>

            <nav>

                <ul className="flex justify-between align-center space-x-8">

                    {status ? (
                        <>
                            <li className='text-2xl text-dark text-bold cursor-pointer hover:text-primary text-secondary'><Link href={"/admin"}><FaUser className="text-3xl" /></Link> </li>
                            <li className='text-2xl text-dark text-bold cursor-pointer hover:text-primary text-secondary' onClick={logOutUser}><AiOutlineLogout /></li>
                            <li className='text-2xl text-dark text-bold cursor-pointer hover:text-primary text-secondary'><Link href={"/new"}><AiOutlineFileAdd /></Link> </li>
                        </>
                    ) :
                        <>
                            <li className='text-xl text-dark text-bold cursor-pointer hover:text-primary text-secondary'><Link href={"/signUp"}>Sign Up</Link> </li>
                            <li className='text-xl text-dark text-bold cursor-pointer hover:text-primary text-secondary'><Link href={"/signIn"}>Login</Link> </li>
                        </>
                    }
                </ul>

            </nav>
        </header >
    )
}

export default Header