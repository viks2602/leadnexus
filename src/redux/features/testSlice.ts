import {createSlice} from "@reduxjs/toolkit";

const initialState={
    userData:'',
    token:'',
    naicsCode:'',
}

export const testSlice = createSlice({
    name:'test',
    initialState:initialState,
    reducers:{
        // userid
        changeUser:(state , action)=>{
            state.userData =action.payload
        },
        
        // token
        changeToken:( state , action )=>{
            state.token =action.payload
        },
        //naicsCode
        changeNaicsCode:(state , action)=>{
            state.naicsCode =action.payload

        }
    }
})

export const {changeToken,changeUser,changeNaicsCode} = testSlice.actions;

export default testSlice.reducer