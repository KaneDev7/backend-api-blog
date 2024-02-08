"use client"
import React, { useContext, useState } from 'react'
import { login } from '../../../lib/auth'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../use.case/authSlice'
import { useRouter } from 'next/navigation'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const rooter = useRouter()


    const handelUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handelPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (username.trim() === '') {
            return setUsernameMessage('Le nom d\'utilisateur est obligatoire')
        }

        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        setError('')
        const data = await login(formData)

        if (data?.response?.status === 404) {
            return setError('Le mot de passe ou le nom d\'utilisateur est incorrecte')
        }
        if (data?.status === 200) {
            sessionStorage.setItem('auth', JSON.stringify(data?.data))
            dispatch(setAuth(data?.data))
            rooter.push('/')
        }


    }
    return (
        <div className='globalWidth max-w-sm mx-auto '>
            <div className='mt-20'>
                <h1 className='text-4xl'> Se connecter </h1>
                {
                    error &&
                    <div className='py-3 px-5 mt-4 rounded-md bg-red-100 text-red-500'>
                        {error}
                    </div>
                }


                <form className="mt-5" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom d'utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handelUsernameChange}
                            className={`bg-gray-50 border ${error ? 'border-red-300' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@flowbite.com" required />

                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de pasee</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handelPasswordChange}
                            className={`bg-gray-50 border ${error ? 'border-red-300' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@flowbite.com" required />


                    </div>

                    {/* <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div> */}
                    <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}
