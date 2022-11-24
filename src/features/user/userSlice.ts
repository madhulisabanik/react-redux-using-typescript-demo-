import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
//const createSlice = require('@reduxjs/toolkit').createSlice
//const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk
//const axios = require('axios')

type User = {
    id: number
    name: string
}

type InitialState = {
    loading: boolean
    user: User[]
    error: string
}

const initialState: InitialState = {
    loading: false,
    user: [],
    error: ''
}

// Promise generates - pending, fulfilled, rejected action types
export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.data)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.loading = false,
            state.user = action.payload,
            state.error = ''
        }),
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false,
            state.user = [],
            state.error = action.error.message || 'Something went wrong!'
        })
    }
})

export default userSlice.reducer
//module.exports.fetchUsers = fetchUsers