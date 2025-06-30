// State in react is just data. Every time data is altered, it's state is changed by react 
// to reflect the change in data

import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'

// Adds redux state management
import {useSelector, useDispatch} from 'react-redux'

// Navigate simply allows us to redirect to another page
import {useNavigate} from 'react-router-dom'

// Adds user feedback with popups
import {toast} from 'react-toastify'

// Import login and reset functionalities from authSlice
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  // useState is a React Hook that creates a state variable, formData, and a function to alter the state, setFormData
  const [formData, setFormData] = useState({
    email: '',
    passowrd: '',
  })
 
  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Pulling values from authSlice to check for error, success, or loading, and redirect the user/ show toast error conditionally
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  // useEffect here to handle side effects like the 3 cases
  useEffect(() => {
    // Shows toast error if it's rejected
    if (isError) {
        toast.error(message)
    }

    // Redirect to dashboard if successful
    if (isSuccess || user) {
      navigate('/')
    }

    // Clears the redux state (resets it)
    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])


  // This function takes in event e, and alters the state of the target whose name attribute is changed
  // ...prevState ensures everything else remains the same
  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  // Implementation not set yet, so this is set as default
  // It prevents HTML from reloading the page, so basically ensures button does nothing
  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }
  
  return <>
    <section className='heading'>
        <h1>
            <FaSignInAlt /> Login
        </h1>
        <p>Login to your account </p>
    </section>

    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" id='email' name='email' 
                    value={email} placeholder='Enter your email' onChange={onChange}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id='password' name='password' 
                    value={password} placeholder='Enter your password' onChange={onChange}/>
            </div>
            <div className="form-group">
                <button type='submit' className='btn btn-block'>
                    Submit
                </button>
            </div>
        </form>
    </section>
  </>
}

export default Login