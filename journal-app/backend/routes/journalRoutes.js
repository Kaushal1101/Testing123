const express = require('express')
const router = express.Router()
const { getJournals, writeJournal, updateJournal, deleteJournal, mergeJournals, getJournalById } = require('../controller/journalController')
const { protect, authorizeRoles } = require('../middleware/authMiddleware')

router.route('/').get(protect, getJournals).post(protect, writeJournal)

router.route('/:id1/:id2').put(protect, mergeJournals)

router.route('/:id').delete(protect, deleteJournal).put(protect, updateJournal).get(protect, getJournalById)



module.exports = router


