import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './EntrySnippet.css'
import { format } from 'date-fns'

// Takes in a journal to display
function EntrySnippet({ journal, currUser, onDelete }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

   const isOwn = journal.user?._id === currUser?._id
   const hasPermission = isOwn || (journal.user?.role === 'basic' && currUser?.role === 'premium')

   //console.log(isOwn, journal.user.role === 'basic' && currUser.role === 'premium', journal.user)
   //console.log(journal.user.role, journal.user, currUser.role, currUser)

   //console.log(journal.user._id, journal.user, currUser._id)


  const handleClick = () => {
    navigate('/journal/' + journal._id, { state: { journal } })
  }

  // Essentially handles how the journal is rendered
  // Should be able to add CSS here to improve upon it
 return (
  <div className="journal-card" onClick={handleClick}>
  <div className="journal-meta">
    <h2 className="journal-title">{journal.title}</h2>
    <p className="journal-sub">By {isOwn ? "me" : journal.user.name}</p>
    <p className="journal-date">
      {format(new Date(journal.createdAt), 'PPPp')}
    </p>
  </div>

  <div className="journal-divider" />

  <div className="journal-snippet">{journal.content.slice(0, 100)}...</div>

  {/*console.log('Render button:', { isOwn, currUserRole: currUser.role, journalUserRole: journal.user.role })*/}
  {isOwn || hasPermission ? (
    <div className="journal-buttons">
      <button
        className="journal-btn delete"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(journal._id)
        }}
      >
        Delete
      </button>
    </div>
    // <div className='journal-buttons'>
    //   <button className='journal-btn-delete' onClick={(e) => { e.stopPropagation(); onDelete(journal._id);}}>Delete</button>
    // </div>
  ) : null}
</div>
 )
}

export default EntrySnippet