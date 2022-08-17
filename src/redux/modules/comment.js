import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const __getComment = createAsyncThunk(
    'comment/getComment',
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get(`http://localhost:3001/comments`)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const __postComment = createAsyncThunk(
    'comment/postComment',
    async (payload, thunkAPI) => {
        try {
            console.log(payload[1])
            console.log(payload[0])
            const data = await axios.post(`http://54.180.122.99/api/comments/${payload[1]}`, payload[0])
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const __deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async (payload, thunkAPI) => {
        try {
            const data = await axios.delete(`http://localhost:3001/comments/${payload}`)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)




export const commentSlice = createSlice({
    name: 'comments',
    initialState:{
        comments: [],
        isLoading2: false,
        error2: null,
    },
    reducers: {},
    extraReducers: {
        [__getComment.pending]: (state) => {
            state.isLoading2 = true;
        },
        [__getComment.fulfilled]: (state, action) => {
            state.isLoading2 = false;
            state.comments = action.payload;
        },
        [__getComment.rejected]: (state, action) => {
            state.isLoading2 = false;
            state.error = action.payload;
        }
    }
})
