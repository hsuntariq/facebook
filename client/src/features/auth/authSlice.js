import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './authService';


const user = JSON.parse(localStorage.getItem('user'));

// define the initialState
const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}



// handle the registration

export const signUP = createAsyncThunk('auth/register', async (formData, thunkAPI) => {
    try {
        return authService.registerUser(formData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})



// create the slice

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUP.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signUP.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(signUP.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
    }
});


export const { reset } = authSlice.actions;
export default authSlice.reducer;

