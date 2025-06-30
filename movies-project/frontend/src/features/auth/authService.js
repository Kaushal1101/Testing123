// Axios is a library used to make HTTP requests
// Imported here to call backend through /api/users
import axios from 'axios'

// URL we want to call
const API_URL = '/api/users/'

// Defining an async function register, taking in userData
const register = async (userData) => {
    // Sends an HTTP request to /api/users with userData
    // Axios simplifies this process, and automatically returns a parsed response
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        // Local storage is frontend only storage system provided by browser to store key-value pairs
        // of secure information on user's device
        // It is only accessible on browser (not server) and doesn't expire even when reloaded or browser closed
        // Local storage is not a session, think of it as the storage that stores the JWT token for authentication
        // It is also not 100% secure (can be hacked/injected)
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    // Returns the response data (either error or user data) to our createAsyncThunk in authSlice
    return response.data
} 

const login = async (userData) => {
    // Sends an HTTP request to /api/users with userData
    // Axios simplifies this process, and automatically returns a parsed response
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        // Local storage is frontend only storage system provided by browser to store key-value pairs
        // of secure information on user's device 
        // It is only accessible on browser (not server) and doesn't expire even when reloaded or browser closed
        // Local storage is not a session, think of it as the storage that stores the JWT token for authentication
        // It is also not 100% secure (can be hacked/injected)
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    // Returns the response data (either error or user data) to our createAsyncThunk in authSlice
    return response.data
} 

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login 
}

export default authService