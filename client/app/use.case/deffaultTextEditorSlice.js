import {createSlice} from '@reduxjs/toolkit'

export const defaultTextEditorSlice = createSlice({
    initialState : null,
    name : 'defaultText',
    reducers :{
        setDefaultText : (state, action) =>{
            return action.payload
        }
    }
})

export const {setDefaultText} =  defaultTextEditorSlice.actions