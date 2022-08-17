import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

///54.180.122.99 [backend server ip]
//// 상품 관련 Axios!

//1 Main 상품

export const __getProducts = createAsyncThunk(
    'getProducts',
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get('http://54.180.122.99/api/products')
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [__getProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [__getProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.products = action.payload
        },
        [__getProducts.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
    },
})

//Detail 상품
export const __getProduct = createAsyncThunk(
    'getProduct',
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get(`http://54.180.122.99/api/product/${payload}`)
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __postProduct = createAsyncThunk(
    'postProduct',
    async (payload, thunkAPI) => {
        try {
            const data = axios.post('http://54.180.122.99/api/product', payload)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const __deleteProduct = createAsyncThunk(
    'deleteProduct',
    async (productId, thunkAPI) => {
        try {
            const data = axios.delete(`http://54.180.122.99/api/product/${productId}`, productId)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [__getProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [__getProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.product = action.payload
        },
        [__getProduct.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
    },
})


//// 댓글 관련 Axios!!

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
            const data = await axios.post(`http://localhost:3001/comments`, payload)
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




export default configureStore({
    reducer: {
        products: productsSlice.reducer,
        product: productSlice.reducer,
        comments: commentSlice.reducer,


    }
})


