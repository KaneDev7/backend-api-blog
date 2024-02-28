"use client"
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from './components/Footer/Footer'
import React from "react";
import { Provider } from "react-redux";
import { store } from './store/store'

const inter = Open_Sans({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Provider store={store}>
          <Navbar />
          <div className="globalWidth">
            {children}
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
