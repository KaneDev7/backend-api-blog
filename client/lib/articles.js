import axios from "axios"

export const getArticles = async () => {
    try {
        const res = await fetch('http://localhost:3001/articles')
        const data = await res.json()
        console.log('data',data)
        return data
    } catch (error) {
        console.log(error)
    }
}


export const getArticle = async (id) => {
    try {
        const res = await fetch(`http://localhost:3001/article/${id}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}


export const posteArticle = async (formData) => {
    console.log('data', JSON.stringify(formData))
    try {
        const res = await axios.post(`http://localhost:3001/article`,
            formData,
             { headers: { 'Content-Type': 'application/json' } }
        )
        console.log('reponse', res.data)
    } catch (error) {
        console.log(error)
    }
}


export const deleteArticle = async (id) => {
    try {
        const res = await fetch(`http://localhost:3001/article/${id}`, {
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
        const res = await fetch(`http://localhost:3001/article/${id}`, {
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

