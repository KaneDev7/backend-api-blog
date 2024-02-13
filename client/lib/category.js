import axios from "axios"
import { baseUrl } from "../app/constatnt"

export const getCategory = async () => {
    try {
        const res = await fetch(`${baseUrl}/categories`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}