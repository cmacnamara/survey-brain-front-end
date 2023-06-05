// css
import styles from './Landing.module.css'

// npm modules
import { NavLink } from 'react-router-dom'

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>
      <h1>SurveyBrain</h1>
      <h3>Insights that matter.</h3>
      <h1>LOGO IMAGE</h1>
      {user ? 
        <NavLink to='/surveys'>
          <button>My Surveys</button>
        </NavLink>
      :
        <NavLink to='/auth/signup'>
          <button>Get Started</button>
        </NavLink>
      }
    </main>
  )
}

export default Landing
