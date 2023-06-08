// assets
import logo from '../../assets/branding/logo_transparent.png'

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
      <img className={styles.logo} src={logo} />
      <h3 className={styles.slogan}>Insights that matter.</h3>
      {user ? 
        <NavLink className={styles.navLink} to='/surveys'>
          <button className={styles.landingBtn}>My Surveys</button>
        </NavLink>
      :
        <NavLink className={styles.navLink} to='/auth/signup'>
          <button className={styles.landingBtn}>Get Started</button>
        </NavLink>
      }
    </main>
  )
}

export default Landing
