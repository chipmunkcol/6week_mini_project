import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


















// 상품 관련 Axios!

export const __getProducts = createAsyncThunk(
    'getProducts',
    async (payload, thunkAPI) => {
        try {
        const data = await axios.get('https://codingapple1.github.io/shop/data2.json')
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



export default configureStore({
    reducer: {
        products: productsSlice.reducer,

    }
})


