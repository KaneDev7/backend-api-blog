
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
        console.log('comment', res.data)
    } catch (error) {
        console.log(error)
    }
}

export const postResponseToComment = async (formData) => {
    console.log('data', JSON.stringify(formData))
    try {
        const res = await axios.post(`${baseUrl}/comment/response`,
            formData,
             { headers: { 'Content-Type': 'application/json' } }
        )
        console.log('reponse', res.data)
    } catch (error) {
        console.log(error)
    }
}

export const addLike = async (userId, commentId) => {
    try {
        const res = await axios.patch(`${baseUrl}/comments/likes/${commentId}?userId=${userId} `,
            {},
             { headers: { 'Content-Type': 'application/json' } }
        )
        console.log('reponse', res.data)
    } catch (error) {
        console.log(error)
    }
}

export const addLikeToResponseComment = async (userId, responseId) => {
    try {
        const res = await axios.patch(`${baseUrl}/comments/response/likes/${responseId}?userId=${userId} `,
            {},
             { headers: { 'Content-Type': 'application/json' } }
        )
        console.log('reponse', res.data)
    } catch (error) {
        console.log(error)
    }
}