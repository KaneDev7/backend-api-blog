import Link from 'next/link';
import React from 'react'
import { BsSendArrowUp } from "react-icons/bs";
import LinkList from './LinkList'

import {
  footerBottomList,
  listLink1,
  listLink2,
  listLink3,
  listLink4,
  listLink5,
  listLink6
} from './constant'


export default function Footer() {
  return (
    <footer className='mt-10 mb-5 '>

      <div style={{
        background: `url(/bg_subscribe.jpg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
        className='w-full h-[300px] flex justify-center items-center'>

        <div className='w-1/2 text-center text-black/80 '>
          <h1 className='text-3xl font-bold'>NewsLetters de SENBLOG</h1>
          <p className='mt-4'>Le meilleur de SENBLOG.com sélectionné par la rédaction</p>

          <form className='w-full mt-10 flex rounded-md overflow-hidden shadow-sm'>
            <input
              className='flex-1 p-4  outline-none text-sm '
              type="text" name=""
              placeholder='votre email'
            />
            <button className='px-5 flex gap-4 items-center bg-primary text-white'>
              <BsSendArrowUp />
              <span className='text-sm'>S'inscrire</span>
            </button>
          </form>
        </div>

      </div>

      <div className='w-full  bg-[#10171d]  mt-10'>
        <header className='py-10 px-12 flex gap-4 flex-wrap bg-[#141b21] '>
          <div className='text-white'>
            <h1 className='font-bold text-primary/80 text-[15px] '>Service Commercial</h1>

            <div className='flex flex-wrap gap-2 text-[12px]  mt-4 '>
              <p className='mr-2'>
                <span className='text-white/70'> Senegal, Afrique: </span>
                +221 77 243 35 35 / +221 33 860 09 50
                <span className='mx-3'>/</span>
                <span className='text-white/70'>USA,Canada, Europe : </span>+1-202-596-2610
                <span className='mx-3'>/</span>
                <span className='text-white/70'>Email : </span>pub@seneweb.com
              </p>

            </div>
          </div>

          <div className='text-white'>
            <h1 className='font-bold text-[15px] text-primary/80  '>Rédaction / Contributions</h1>
            <div className='flex flex-wrap gap-2 text-[12px]  mt-4 '>
              <p>
                <span className='text-white/40 '>Email:</span> redaction@seneweb.com | <span className='text-white/70'> 000-000-000  </span>
              </p>
            </div>
          </div>
        </header>
        <main className='py-20 px-12 flex justify-between flex-wrap  '>
          <LinkList list={listLink1} />
          <LinkList list={listLink2} />
          <LinkList list={listLink3} />
          <LinkList list={listLink4} />
          <LinkList list={listLink5} />
          <LinkList list={listLink6} />
        </main>

        <footer className='flex justify-between mx-12 py-7 border-t border-primary/30'>
          <p className='text-white/70 text-[11px]'> Copyright © 2018 Seneweb.com </p>
          <p className=''>
            {
              footerBottomList.map(item => (
                <Link href={'#'} className='text-white/60 hover:text-white text-[10px] mr-2 ' >{item} </Link>
              ))
            }
          </p>
        </footer>
      </div>

    </footer>
  )
}
