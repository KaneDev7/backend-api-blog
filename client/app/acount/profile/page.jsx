"use client"
import { useEffect, useState } from "react";
import { deleteArticle, getArticles, getUserArticle } from "../../../lib/articles";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { troncText } from '../../../utils'

export default function page() {
    const [articles, setArtcicles] = useState()
    const auth = useSelector(state => state.auth)
    const rooter = useRouter()

    const handleDeleteArticle = async (id, url) => {
        const confirmDelete = window.confirm('Voulez-vous vraiment supprimer l\'article')
        if (!confirmDelete) return
        const data = await deleteArticle(id, url, auth.id)
        console.log('data', data)
        setArtcicles(data?.articles)
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserArticle(auth?.id)
            console.log('dataaaa', data)
            setArtcicles(data)
        }
        fetchData()
    }, [])

    return (
        <div className='mt-10'>
            <div className='flex justify-between gap-10'>
                <div className=''>
                    <div>
                        <FaCircleUser fontSize={200} className="text-black/80" />
                        <p className='text-center text-primary mt-4 text-2xl font-medium'> {auth?.username} </p>
                        <p className='text-center text-sm'> {articles?.length} articles</p>
                    </div>
                </div>
                <div className='flex-1 border bg-gray-50 rounded-md min-h-[500px] p-10'>
                    <h1 className='text-2xl font-bold'>Mes articles </h1>
                    <ul className="mt-4">
                        {articles?.length <= 0 && <p>accuun article trouvé</p>}
                        {
                            articles?.map((item, index) => (
                                <li className={`text-[15px] ${index !== articles.length - 1 && 'border-b'} border-primary/10 py-4 flex justify-between items-center`} >
                                    <div>
                                        <Link className="hover:underline" href={`/articles/${item.id}`}> {troncText(item.title, 50)} </Link>
                                        <p className="text-[12px] text-black/60 "> {new Date(item.createdAt).toLocaleDateString()} </p>
                                    </div>
                                    <div className="flex items-center gap-3 text-white">
                                        {/* <button
                                            className="bg-blue-500 text-sm py-2 px-4 rounded-md">
                                            <Link href={`/acount/profile/edit/${item?.id}`}> Modifier </Link>
                                        </button> */}
                                        <MdDelete
                                            size={25}
                                            onClick={() => handleDeleteArticle(item.id, item.url)}
                                            className="text-primary/90 hover:text-primarys">

                                        </MdDelete>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}
