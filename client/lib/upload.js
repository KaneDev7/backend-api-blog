import axios from "axios"

export const upload = async (formData) => {
    try {
        const result = await axios.post('http://localhost:3001/api/image',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } })
    } catch (error) {
        console.log(error)
    }
}