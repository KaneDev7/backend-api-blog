"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import React, {useEffect} from "react"; 
import { Provider } from "react-redux";
import { setAuth } from './use.case/authSlice'
import { store } from './store/store'

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {

  useEffect(() => {
    const sessionAuth = JSON.parse(sessionStorage.getItem('auth')) || null
    setAuth(sessionAuth)
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <div className="globalWidth">
            {children}
          </div>
        </Provider>

      </body>
    </html>
  );
}
