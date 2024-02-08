import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    initialState : null,
    name : 'auth',
    reducers :{
        setAuth : (state, action) =>{
            return action.payload
        }
    }
})

export const {setAuth} =  authSlice.actions