
import axios from "axios"
import { baseUrl } from "../app/constatnt"


export const getComments = async (articleId) => {
    try {
        const res = await fetch(`${baseUrl}/comments?articleId=${articleId}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getComment= async (id) => {
    console.log('id', id)
    try {
        const res = await fetch(`${baseUrl}/comments/${id}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const postComment = async (formData) => {
    try {
        const res = await axios.post(`${baseUrl}/comments`,
            formData,
            { headers: { 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        console.log(error)
    }
}

export const editComment = async (id, formData) => {
    try {
        const res = await axios.put(`${baseUrl}/comments/${id}`,
            formData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        const data = await res.json()
    } catch (error) {
        console.log(error)
    }
}

export const editResponseToComment = async (id, formData) => {
    try {
        const res = await axios.put(`${baseUrl}/comments/response/${id}`,
            formData,
            { headers: { 'Content-Type': 'application/json' } }
        )
        const data = await res.json()
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/comments/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteResponseToComment = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/comments/response/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const postResponseToComment = async (formData) => {
    try {
        const res = await axios.post(`${baseUrl}/comments/response`,
            formData,
            { headers: { 'Content-Type': 'application/json' } }
        )
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
    } catch (error) {
        console.log(error)
    }
}