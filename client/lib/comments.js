
import axios from "axios"
import { baseUrl } from "../app/constatnt"



export const getComments = async (articleId) => {
    console.log('front' , articleId)
    try {
        const res = await fetch(`${baseUrl}/comments?articleId=${articleId}`)
        const data = await res.json()
        console.log('data',data)
        return data
    } catch (error) {
        console.log(error)
    }
}


export const postComment = async (formData) => {
    console.log('data', JSON.stringify(formData))
    try {
        const res = await axios.post(`${baseUrl}/comments`,
            formData,
             { headers: { 'Content-Type': 'application/json' } }
        )
        console.log('reponse', res.data)
    } catch (error) {
        console.log(error)
    }
}