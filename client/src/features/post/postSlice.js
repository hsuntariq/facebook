import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postService } from './postService';

const initialState = {
    posts: [],
    postLoading: false,
    postSuccess: false,
    postError: false,
    postMessage: ''
}


export const postData = createAsyncThunk('posts/add-caption', async (post, thunkAPI) => {
    try {
        return await postService.postCaption(post)
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reset: (state) => {
            state.postError = false;
            state.postSuccess = false;
            state.postLoading = false;
            state.postMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postData.pending, (state) => {
                state.postLoading = true
            })
            .addCase(postData.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = true;
                state.postMessage = action.payload
            })
            .addCase(postData.fulfilled, (state, action) => {
                state.postLoading = false;
                state.postSuccess = true;
                state.posts.push(action.payload)
            })
    }

})


export const { reset } = postSlice.actions;
export default postSlice.reducer;
