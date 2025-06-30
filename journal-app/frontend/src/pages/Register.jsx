import {useState, useEffect} from 'react'

// Adds redux state management
import {useSelector, useDispatch} from 'react-redux'

// Navigate simply allows us to redirect to another page
import {useNavigate} from 'react-router-dom'

// Adds user feedback with popups
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'

// Import register and reset functionalities from authSlice
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

import '../App.css'

function Register() {
  const [formData, setFormData] = useState({
    name:'', 
    email: '',
    passowrd: '',
    cnfmpassword: '',
    role: ''
  })

  const { name, email, password, cnfmpassword, role } = formData
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


  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  // Once submitted, validates password and registers user
  const onSubmit = (e) => {
    e.preventDefault()
    
    if (password !== cnfmpassword) {
        toast.error("Passwords do not match")
    } else {
        const userData = {
            name, 
            email, 
            password,
            role
        }
         
        dispatch(register(userData))
    }
  }
  
  // Generates spinning loading sign UI
  if (isLoading) {
    return <Spinner />
  }

  return <>
    <section className='heading'>
        <h1>
            <FaUser /> Register
        </h1>
        <p>Please create an account </p>
    </section>

    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" id='name' name='name' 
                    value={name} placeholder='Enter your name' onChange={onChange}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id='email' name='email' 
                    value={email} placeholder='Enter your email' onChange={onChange}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id='password' name='password' 
                    value={password} placeholder='Enter your password' onChange={onChange}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id='cnfmpassword' name='cnfmpassword' 
                    value={cnfmpassword} placeholder='Confirm your password' onChange={onChange}/>
            </div>
            <div>
            <select className="form-control" id="role" name="role" value={role} onChange={onChange}>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
            </select>
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

export default Register