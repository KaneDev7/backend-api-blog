import axios from "axios"
import { baseUrl } from "../app/constatnt"

export const getCategories = async () => {
    try {
        const res = await fetch(`${baseUrl}/categories`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getCategory = async (title) => {
    try {
        const res = await fetch(`${baseUrl}/categories/${title}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}