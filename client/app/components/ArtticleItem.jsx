import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { convertISOToDuration, troncText } from '../../utils'



export default function ArtticleItem({ article, type}) {
    return (
        <li key={article.id} className='my-5'>
            <Link href={`/articles/${article.id}`}>
                <Image className={`w-full aspect-auto min-h-[160px] object-cover`} alt="image de l'article" src={`/images/${article.url}`} width={500} height={400} />
            </Link>

            <Link href={`/articles/${article.id}`}>
                <h1 title={article.title} className='mt-2 text-[16px] font-bold hover:underline'> {troncText(article.title, 50)} </h1>
            </Link>
            <span className="text-[13px] text-black/75"> {convertISOToDuration(article?.createdAt)}  </span>
        </li>
    )
}
