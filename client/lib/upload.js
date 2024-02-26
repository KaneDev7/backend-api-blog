import axios from "axios"
import { baseUrl } from "../app/constatnt"

export const upload = async (formData) => {
    try {
        await axios.post(`${baseUrl}/api/image`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
    } catch (error) {
        console.log(error)
    }
}