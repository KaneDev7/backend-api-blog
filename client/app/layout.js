"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from './store/store'
import { useParams } from "next/navigation";
import Category from "./components/Category";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
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
