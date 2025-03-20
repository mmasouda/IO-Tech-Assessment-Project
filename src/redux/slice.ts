import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosReq } from "../../axios";


export const fetchPosts = createAsyncThunk("post/fetchPosts",
    () => {
        const response = axiosReq.get(`/posts/`);
        return response;
    });

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
        posts: [],
        error: false
    },
    reducers: {
        patchItem: (state, action) => {
            const patchedArr = state.posts.map(
                (item: { id: number }) => {
                    if (item.id !== action.payload.id) {
                        return item;
                    } else {
                        return action.payload
                    }
                });
            state.posts = patchedArr as never[];
        },
        addItem: (state, action) => {
            state.posts = [action.payload, ...state.posts] as never[];
        },
        deleteItem: (state, action) => {
            const deletedArr = state.posts.filter((item: { id: number }) => item.id !== action.payload);
            state.posts = deletedArr;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload.data
        });
    }
});

export const { patchItem, addItem, deleteItem, setError } = storeSlice.actions;

export default storeSlice.reducer;