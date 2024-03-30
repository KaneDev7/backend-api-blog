"use client"
import React, { useState, useEffect } from 'react'

export default function SrollIndicator({ style }) {
    const [scrollIndicatorWidth, setScrollIndicatorWidth] = useState()

    useEffect(() => {
        const handleScroll =  () => {
            const totalScrollY = document.body.offsetHeight - window.innerHeight
            const width = (window.scrollY / totalScrollY)  * 100
            setScrollIndicatorWidth(width)
        }

        window.addEventListener('scroll',handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    return (
        <div
            style={{
                width: scrollIndicatorWidth + '%',
                transition : '.1s'
            }}
            className={`h-[5px]  bg-primary ${style}`} >
        </div>
    )
}
