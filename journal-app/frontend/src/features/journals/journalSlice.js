import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import journalService from './journalService'

const initialState = {
    journals: [],
    selectedJournal: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create journal function
export const createJournal = createAsyncThunk('journals/create', 
    async (journalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await journalService.createJournal(journalData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get user journals
export const getJournals = createAsyncThunk('journals/getAll', 
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await journalService.getJournals(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get journal by id
export const getJournalById = createAsyncThunk('journals/:id', 
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await journalService.getJournalById(id, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete user journal
export const deleteJournal = createAsyncThunk(
    'journals/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await journalService.deleteJournal(id, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        reset: (state) => {
            state.journals = []
            state.selectedJournal = null
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
        resetSelectedJournal: (state) => {
            state.selectedJournal = null
        }
    }, 

    extraReducers: (builder) => {
        builder
            .addCase(createJournal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createJournal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // Addd the journal to journals list for that user
                state.journals.push(action.payload)
            })
            .addCase(createJournal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getJournals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getJournals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.journals = action.payload
            })
            .addCase(getJournals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteJournal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteJournal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.journals = state.journals.filter((journal) => journal._id !== action.payload.id)
            })
            .addCase(deleteJournal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getJournalById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getJournalById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.selectedJournal = action.payload 
            })
            .addCase(getJournalById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })    
    }
})

export const {reset, resetSelectedJournal} = journalSlice.actions
export default journalSlice.reducer

