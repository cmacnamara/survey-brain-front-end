// components
import SurveyCard from '../../components/SurveyCard/SurveyCard';

// css
import styles from './Surveys.module.css'

// npm modules
import { NavLink } from 'react-router-dom'

// types
import { Survey } from '../../types/models'

interface SurveysProps {
  surveys: Survey[];
}

const Surveys = (props: SurveysProps) => {
  const { surveys } = props

  return (
    <main className={styles.surveysContainer}>
      <div>
        <h1>Create a survey</h1>
        <NavLink to="/surveys/create">
          <div className={styles.newSurveyBtn}>
            +
          </div>
        </NavLink>
      </div>
      <div>
        <h1>My surveys</h1>
        {!surveys.length ?
          <h3>No surveys created yet</h3>
          :
          surveys.map((survey: Survey) => (
            <SurveyCard 
              key={survey.id}
              survey={survey} 
            />
          ))
        }
      </div>
    </main>
  );
}

export default Surveys;