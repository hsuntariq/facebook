import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService';

// check if user is stored in the localstorage
const user = JSON.parse(localStorage.getItem('user'));

// create the initial state
const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}



export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
        return await authService.signUP(data)
    } catch (error) {

    }
})


export const logout = createAsyncThunk('auth/logout', (_, thunkAPI) => {
    try {
        return authService.signOUT()
    } catch (error) {

    }
})



// create the slice

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = "An Error Occured"
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isSuccess = true;
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;