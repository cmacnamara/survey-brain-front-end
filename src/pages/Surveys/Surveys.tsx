// css
import styles from './Surveys.module.css'

// npm modules
import { NavLink } from 'react-router-dom'

const Surveys = () => {
  return (
    <main className={styles.surveysContainer}>
      <div>
        <h1>Create a survey</h1>
        <NavLink to="surveys/create">
          <div className={styles.newSurveyBtn}>
            +
          </div>
        </NavLink>
      </div>
      <div>
        <h1>My surveys</h1>
      </div>
    </main>
  );
}

export default Surveys;