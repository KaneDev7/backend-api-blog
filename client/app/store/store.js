import {configureStore} from '@reduxjs/toolkit'
import { authSlice } from '../use.case/authSlice'
import { defaultTextEditorSlice } from '../use.case/deffaultTextEditorSlice'



export const store = configureStore({
    reducer :{
        auth : authSlice.reducer,
        defaultText : defaultTextEditorSlice.reducer
    }
})


