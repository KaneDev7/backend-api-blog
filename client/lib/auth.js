import axios from "axios"
import {baseUrl} from '../app/constatnt'

export const register = async (formData) => {
    console.log('data', JSON.stringify(formData))
    let response = null
    try {
        const res = await axios.post(`${baseUrl}/auth/register`,
            formData,
             {
                headers: { 'Content-Type': 'application/json'},
            }
        )
        response = res

    } catch (error) {
        console.log('error', error)
        response = error
    }

    return response
}

export const login = async (formData) => {
    let response = null

    try {
        const res = await axios.post(`${baseUrl}/auth/login`,
            formData,
             { 
                headers: { 'Content-Type': 'application/json' },
             }
        )
        console.log('reponse', res.data)
        response = res

    } catch (error) {
        console.log(error)
        response = error
    }
    return response
}
