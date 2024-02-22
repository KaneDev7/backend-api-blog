import Link from 'next/link'
import React from 'react'
import { formatDate } from '../../../../utils'

export default function ArticleDetail({article, commentLength}) {
    return (
        <p className="text-[13px] pb-3 border-b">
            Par.<span className="text-primary font-bold"> {article?.user?.username} - </span>
            <Link href='/' className="text-blue-400">kanblog</Link> |
            <span className=""> {formatDate(article?.createdAt)}</span> |
            <span className="text-primary"> {commentLength} commentaire{commentLength > 1 && 's'} </span>
        </p>
    )
}
