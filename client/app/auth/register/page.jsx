"use client"
import React, { useState } from 'react'
import { register } from '../../../lib/auth'
import Link from 'next/link'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handelUsernameChange = (e) => {
        setUsername(e.target.value)
        setUsernameMessage('')
    }

    const handelPasswordChange = (e) => {
        setPassword(e.target.value)
        setPasswordMessage('')
        setPasswordMessage('')
    }

    const handelConfimPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        setConfirmPasswordMessage('')
        setConfirmPasswordMessage('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (username.trim() === '') {
            return setUsernameMessage('Le nom d\'utilisateur est obligatoire')
        }

        if (password.trim() !== confirmPassword.trim()) {
            setPasswordMessage('Verifiez ce champ')
            setConfirmPasswordMessage('Verifiez ce champ')
            return setError('les mot de passe ne correspondent pas')
        }

        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        setError('')
        const data = await register(formData)
        console.log('data', data)
        if (data?.response?.status === 409) {
            setSuccess('')
            return setError('Le nom d\'utilisaeur existe deja')
        } 
        if (data?.status === 200) {
            setError('')
            setUsername('')
            setPassword('')
            setConfirmPassword('')
           return setSuccess('Inscription réussie')
        }
    }

    return (
        <div className='max-w-sm mx-auto '>
            <div className='my-40'>
                <h1 className='text-4xl'> S'inscrire </h1>
                {
                    error &&
                    <div className='py-3 px-5 mt-4 rounded-md bg-red-100 text-red-500'>
                        {error}
                    </div>
                }
                {
                    success &&
                    <div className='py-3 px-5 mt-4 rounded-md bg-green-100 text-green-500'>
                        {success}
                        <span className='hover:underline text-blue-500 ml-2'>
                            <Link href='/auth/login'>Se connecter </Link>
                        </span>
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
                            className={`bg-gray-50 border ${usernameMessage ? 'border-red-300' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@flowbite.com" required />

                        {usernameMessage && <p className='text-red-500 my-2'> {usernameMessage} </p>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de pasee</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handelPasswordChange}
                            className={`bg-gray-50 border ${passwordMessage ? 'border-red-300' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@flowbite.com" required />

                        {passwordMessage && <p className='text-red-500 my-2'> {passwordMessage} </p>}

                    </div>
                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handelConfimPasswordChange}
                            className={`bg-gray-50 border ${confirmPasswordMessage ? 'border-red-300' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="name@flowbite.com" required />

                        {confirmPasswordMessage && <p className='text-red-500 my-2'> {confirmPasswordMessage} </p>}

                    </div>
                    {/* <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div> */}
                    <button type="submit"
                        className="text-white bg-black/90 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        S'inscrire
                    </button>
                </form>
            </div>
        </div>
    );
}
