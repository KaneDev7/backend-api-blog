
"use client"
import { useEffect, useState } from "react";
import { getArticles } from "../lib/articles";
import { setAuth } from "./use.case/authSlice";
import { useDispatch } from "react-redux";
import Category from './components/Category'
import ArticleList from './components/ArticleList'
import Navbar from "./components/Navbar";



export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    const sessionAuth = JSON.parse(sessionStorage.getItem('auth')) || null
    dispatch(setAuth(sessionAuth))
  }, [])

  return (
    <main className="globalWidth">
      <Category />
      <ArticleList type='lg' category='Actualités nationales' />
      <ArticleList type='md' category='Politique' />
      <ArticleList type='md' category='Sport' />
      <ArticleList type='md' category='Sciences' />
      <ArticleList type='md' category='Social' />
    </main>
  );
}
