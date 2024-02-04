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
    message: '',
    allUsers: [],
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

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        return await authService.signIn(data)
    } catch (error) {
        const message = error.response.data.error
        return thunkAPI.rejectWithValue(message)
    }
})
export const getUserData = createAsyncThunk('auth/getData', async (_, thunkAPI) => {
    try {
        return await authService.getAllUsers()
    } catch (error) {
        const message = error.response.data.error
        return thunkAPI.rejectWithValue(message)
    }
})
export const resetMail = createAsyncThunk('auth/reset-link', async (data, thunkAPI) => {
    try {
        return await authService.sendResetMail(data)
    } catch (error) {
        const message = error.response.data.error
        return thunkAPI.rejectWithValue(message)
    }
})
export const updatedPass = createAsyncThunk('auth/update-pass', async (data, thunkAPI) => {
    try {
        return await authService.updatePassword(data)
    } catch (error) {
        const message = error.response.data.error
        return thunkAPI.rejectWithValue(message)
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
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getUserData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.allUsers = action.payload;
            })
            .addCase(resetMail.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetMail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resetMail.fulfilled, (state, action) => {
                console.log(action)
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(updatedPass.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatedPass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updatedPass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.user = null;
                localStorage.removeItem('user')
            })

    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;