import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import SearchBar from '../components/SearchBar'
import EntrySnippet from '../components/EntrySnippet'
import Spinner from '../components/Spinner'
import { getJournals, deleteJournal, reset } from '../features/journals/journalSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Basically gets us the required states from the global state
  const { user } = useSelector((state) => state.auth)
  const {journals, isLoading, isError, message} = useSelector((state) => state.journals)

  // const onClick = (journal) => {
  //   console.log('CALLED')
  //   navigate('api/journals/' + journal._id, { state: { journal } })
  // }

  // Is triggered when a page is loaded
  // Decided where to take user (login or dashboard)
  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getJournals())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch]) 

  // Added this error handling seperately due to infinite loop issue
  // Ideally can be combined with useEffect above
  useEffect(() => {
    if(isError) {
      console.log(message)
    }
  }, [isError, message])


  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Your Journal</p>
      </section>

      <SearchBar />

      <section className='content'>
        {journals.length > 0 ? (
          <div className='journal'>
            {journals.map((journal) => (
              <EntrySnippet key={journal._id} journal={journal} currUser={user} onDelete={(id) => dispatch(deleteJournal(id)).then(() => dispatch(getJournals()))}/>
            ))}
          </div>
        ) : (
          <h3>You have not added any journals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard