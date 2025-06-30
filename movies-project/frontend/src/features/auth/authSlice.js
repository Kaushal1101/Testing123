// authSlice is part of the redux toolkit, defining a "slice" in the global app related to authentication
// It tracks user's status

// createSlice allows us to define state + reducers easily
// createAsycnThunk lets us write asynchronous functions easily (like calling APIs)
// Reducers are pure functions, taking in a state and logic, and outputting a new state
// createSlice simplifies this process, taking in the state and logic, and creating the function for us
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


// This is a reducer, attempting to make an async call to register a user
// Redux toolkit gives us 3 states to work with: pending, fulfilled, and rejected
// We're creating an action called "auth/register"
// This action triggers the pending state immediately, and depending on result, dispatches a success or error
export const register = createAsyncThunk('auth/register', 
    // The first argument is passed when this is called as dispatch(register(user)) 
    //The second argument, thunkAPI, gives us tools to work with like rejectWithValue
    async (user, thunkAPI) => {
        try {
            // Calls register() in authService to send request to the backend
            // If successful, then result sent to fulfilled reducer
            return await authService.register(user)
        } catch (error) {
            // Extracts a readable message from different formats that it might come in
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            // Sends this error to the rejected reducer
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk('auth/login', 
    // The first argument is passed when this is called as dispatch(register(user)) 
    //The second argument, thunkAPI, gives us tools to work with like rejectWithValue
    async (user, thunkAPI) => {
        try {
            // Calls register() in authService to send request to the backend
            // If successful, then result sent to fulfilled reducer
            return await authService.login(user)
        } catch (error) {
            // Extracts a readable message from different formats that it might come in
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            // Sends this error to the rejected reducer
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
        // This is an example of a normal synchronous reducer, resetting the state to initial
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    }, 
    // This is where async logic is handled
    // When a createAsyncThunk is used, Redux toolkit automatically creates pending, fulfilled, and rejected 
    // which can be handled as cases under extra reducers, as they are asynchronous
    extraReducers: (builder) => {
        builder 
            // Case for loading (pending)
            // register.pending was triggered
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            // Case for successful (fulfilled)
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // Result returned from async function (user info in this case)
                state.user = action.payload
            })
            // Case for error (rejected)
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.paylaod
                state.user = null
            })
            // Same cases for login
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
            // Added case to ensure successful logout is handled
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    },
})

export const {reset}  = authSlice.actions
export default authSlice.reducer

// Analogy
// createAsyncThunk is the waiter in the restaurant, taking in orders (arguments)
// Kitchen is authSlice. Either the meal is pending (preparing), fulfilled (completed), or rejected (failed to cook)
// The waiter will return with the error or meal
// reset is like a function clearing out the table for next customer

