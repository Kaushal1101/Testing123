import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// authService contains actual logic to talk to the backend
import authService from './authService'

// Checks local storage to check for an existing logged in user
// Does NOT verify JWT token, just checks if someone logged in from recent memory
const user = JSON.parse(localStorage.getItem('user'))

// Sets initial state with user if there is one
// All error, success, and loading flags set to false as default
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register reducer
export const register = createAsyncThunk('auth/register', 
    async (user, thunkAPI) => {
        console.log(user)
        try {
            return await authService.register(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Login reducer
export const login = createAsyncThunk('auth/login', 
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Logout reducer
export const logout = createAsyncThunk('auth/logout', 
    async () => {
        await authService.logout()
    }
)


export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    }, 
    extraReducers: (builder) => {
        builder 
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.paylaod
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.paylaod
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    },
})

export const {reset}  = authSlice.actions
export default authSlice.reducer