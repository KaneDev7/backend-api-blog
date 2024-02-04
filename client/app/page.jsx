
import { getArticles } from "../lib/articles";
import Link from "next/link";

export default async function Home() {

  const articles = await getArticles()
  console.log('articles', articles)

  const troncText = (text, length) =>{
    if(text.length < length) return text
    return text.slice(0,length) + '...'
  }
  if(articles.message){
    return <p>{articles.message} </p>
  }
  return (
    <main className="globalWidth">
      <ul className="mt-[100px] ">
      <h1 className="text-4xl font-bold">Tous les articles</h1>

        {
          articles?.map(item => (
            <li className=" text-2xl mt-5">
              <Link className="hover:underline" href={`/articles/${item.id}`}> {troncText(item.title, 50)} </Link>
              <p className="text-sm "> {new Date(item.createdAt).toLocaleDateString()} </p>
            </li>
          ))
        }
      </ul>
    </main>
  );
}
