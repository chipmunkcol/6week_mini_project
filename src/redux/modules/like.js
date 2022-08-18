import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { getCookieToken } from '../../shared/cookie';

const usertoken = getCookieToken();

export const __postLike = createAsyncThunk(
    'like/postLike',
    async (productId, thunkAPI) => {
        try {
            const data = await axios.post(`http://54.180.122.99/api/likes/${productId}`, {productId: productId},{
                headers: {Authorization: usertoken}})
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const likeSlice = createSlice({
    name: 'likes',
    initialState:{
        likes: [],
    },
    reducers: {},
    
})
