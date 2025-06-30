import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getJournalById, resetSelectedJournal } from '../features/journals/journalSlice'
import './EntryView.css'

function EntryView() {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()

  const [localJournal, setLocalJournal] = useState(location.state?.journal)

  const { selectedJournal, isLoading, isError, message } = useSelector(
    (state) => state.journals
  )

  useEffect(() => {
    if (!localJournal) {
      dispatch(getJournalById(id))
    }

    return () => {
      dispatch(resetSelectedJournal())
    }
  }, [id, localJournal, dispatch])

  const journalToShow = localJournal || selectedJournal

  if (isLoading) return <Spinner />
  if (isError) return <p className="error">{message}</p>
  if (!journalToShow) return <p>Journal entry not found.</p>

  return (
    <div className="entry-view">
      <h1>{journalToShow.title}</h1>
      <hr />
      <p className="entry-content">{journalToShow.content}</p>
      <div className="entry-meta-footer">
        <p>
          By {journalToShow.user?.name || 'Unknown'} on{' '}
          {new Date(journalToShow.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default EntryView