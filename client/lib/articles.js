import axios from "axios"
import { baseUrl } from "../app/constatnt"

export const getArticles = async () => {
    try {
        const res = await fetch(`${baseUrl}/articles`)
        const data = await res.json()
        console.log('data',data)
        return data
    } catch (error) {
        console.log(error)
    }
}


export const getArticle = async (id) => {
    try {
        const res = await fetch(`${baseUrl}/article/${id}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getUserArticle = async (userId) => {
    try {
        const res = await fetch(`${baseUrl}/articles?userId=${userId}`)
        const data = await res.json()
        console.log('data',data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getArticleByCategory = async (categoryId) => {
    console.log('categoryId', categoryId)
    try {
        const res = await fetch(`${baseUrl}/articles?categoryId=${categoryId}`)
        const data = await res.json()
        console.log('data',data)
        return data
    } catch (error) {
        console.log(error)
    }
}



export const posteArticle = async (formData) => {
    console.log('data', JSON.stringify(formData))
    try {
        const res = await axios.post(`${baseUrl}/article`,
            formData,
             { headers: { 'Content-Type': 'application/json' } }
        )
        console.log('reponse', res.data)
    } catch (error) {
        console.log(error)
    }
}


export const deleteArticle = async (id, url, userId) => {
    try {
        const res = await fetch(`${baseUrl}/article/${id}?userId=${userId}&imgName=${url}`, {
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

export const editArticle = async (id, formData) => {
    try {
        const res = await fetch(`${baseUrl}/article/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json()
        console.log('edit', data)
    } catch (error) {
        console.log(error)
    }
}

