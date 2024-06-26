import {
    createSlice,
    createAsyncThunk,
    createAction
} from '@reduxjs/toolkit'
import axios from 'axios'

const URL = "https://667c0beb3c30891b865b129f.mockapi.io/api/products"

export const productData = createAsyncThunk("product", async () => {
    const response = await fetch(URL)
    const data = await response.json()

    console.log(data)

    try {
        return data
    } catch (error) {
        return error
    }
})

const pending = createAction(productData.pending)
const fulfilled = createAction(productData.fulfilled)
const rejected = createAction(productData.rejected)

const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        loading: false,
        error: null,
        data: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(pending, (state) => {
                state.loading = true
            })
            .addCase(fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(rejected, () => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default productSlice.reducer