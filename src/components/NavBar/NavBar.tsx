// npm modules
import { NavLink } from 'react-router-dom'

// types
import { User } from '../../types/models'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <nav>
      <NavLink to="/">
        <h1>SurveyBrain</h1>
      </NavLink>
      {user ? 
        <NavLink to="/surveys">
          <h1>Home</h1>
        </NavLink>
        :
        ''
      }
      {user ?
        <ul>
          <li>
            <NavLink to="" onClick={handleLogout}>
              <button>Log Out</button>
            </NavLink>
          </li>
        </ul>
      :
        <ul>
          <li>
            <NavLink to="/auth/login">
              <button>Log In</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/auth/signup">
              <button>Sign Up</button>
            </NavLink>
          </li>
        </ul>
      }
    </nav>
  )
}

export default NavBar