import axios from 'axios'

const API_URL = '/api/journals/'

// Create a journal
const createJournal = async (journalData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    const response = await axios.post(API_URL, journalData, config)

    return response.data    
}

// Get journals
const getJournals = async (token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    const response = await axios.get(API_URL, config)
    return response.data    
}

const getJournalById = async (id, token) => {
  const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    const response = await axios.get(API_URL + id, config)
    return response.data  
}


// Delete Journal
const deleteJournal = async (id, token) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

  // Remember for delete, we need url and id of journal deleted
  const response = await axios.delete(API_URL + id, config)

  return response.data    
}

// Reset selected journal
const resetSelectedJournal = () => {
  return null
}


const journalService = {
    createJournal,
    getJournals,
    deleteJournal,
    getJournalById,
    resetSelectedJournal
}

export default journalService