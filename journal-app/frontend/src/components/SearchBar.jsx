import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createJournal, getJournals} from '../features/journals/journalSlice'

function JournalForm() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()
    
    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createJournal({ title, content }))
          .unwrap()
          .then(() => dispatch(getJournals()))
        setTitle('')
        setContent('')
    }

    return (
    <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
                type = 'text'
                name = 'title'
                id = 'title'
                value = {title}
                onChange = {(e) => setTitle(e.target.value)}
             />
             <label htmlFor='content'>Content</label>
             <input
                type = 'text'
                name = 'content'
                id = 'content'
                value = {content}
                onChange = {(e) => setContent(e.target.value)}
              />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type='submit'>
                Add Journal Entry
            </button>
          </div>
        </form>
    </section>
  )
}

export default JournalForm