import axios from "axios"


export const register = async (formData) => {
    console.log('data', JSON.stringify(formData))
    let response = null
    try {
        const res = await axios.post('http://localhost:3001/auth/register',
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
        const res = await axios.post(`http://localhost:3001/auth/login`,
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