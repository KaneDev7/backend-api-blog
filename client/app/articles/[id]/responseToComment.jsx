"use client"
import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { Oswald } from "next/font/google";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { PiBellSimpleRinging } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { convertISOToDuration } from '../../../utils';


const inter = Oswald({ subsets: ["latin"] });

 
export default function ResponseToComment({comment, handleAddLikeToRespose }) {
    console.log('comment', comment)
    const auth = useSelector(state => state.auth)

        return (
            <div className='mt-10 ml-[30px]' >
                <div className=''>
                    <header className={`flex gap-5 items-center py-3 border-b`} >
                        <FaCircleUser size={35} color='#9d9d9df1' />
                        <div>
                            <h2 className='font-bold text-[16px] text-black/80 '> {comment?.username} </h2>
                            <span className='text-black/60 font-medium text-[13px] '> {convertISOToDuration(comment.createdAt)} </span>
                        </div>
                    </header>
                    <main className='py-5'>
                        <p className='text-sm leading-6'> {comment.content} </p>
                    </main>

                    <footer className='flex justify-between items-center py-5 mt-4 border-t'>
                        <div className='flex items-center gap-3 cursor-pointer' >
                            <p className='flex items-center gap-1'>
                                {
                                    JSON.parse(comment?.likes).includes(auth?.id.toString()) ?
                                        <AiFillLike onClick={() => handleAddLikeToRespose(comment?.id)} size={20} color='green' /> :
                                        <AiOutlineLike onClick={() => handleAddLikeToRespose(comment?.id)} size={20} color='#7c7c7c' />
                                }
                                <span className='text-[13px] text-[#7c7c7c] '> + {JSON.parse(comment?.likes).length} </span>
                            </p>
                        </div>
                        <div className={`${inter.className} flex items-center gap-2 cursor-pointer text-sm text-red-600 `} >
                            <PiBellSimpleRinging size={17} />
                            <p>Signaler</p>
                        </div>
                    </footer>

                </div>

            </div>
        )
    }



