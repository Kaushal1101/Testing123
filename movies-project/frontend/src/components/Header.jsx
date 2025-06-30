// fa stands for font awesome, which is one of the libraries under react-icons
// These are just icons, the links are created by adding the route, like "/login" for example
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'

// This allows us to navigate using links, without reloading the entire page like HTML
import {Link, useNavigate} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'

import {logout, reset} from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className='header'>
        <div className='logo'>
            <Link to="/">MovieSelector</Link>
        </div>
        <ul>
            { user ? (  
            <li>
            <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
            </button>
            </li>
        ) : (<>
            <li>
            <Link to='/login'>
                <FaSignInAlt /> Login
            </Link>
            </li>
            <li>
            <Link to='/register'>
                <FaUser /> Register
            </Link>
        </li>
        </>) }
        </ul>
    </header>
  )
}

export default Header