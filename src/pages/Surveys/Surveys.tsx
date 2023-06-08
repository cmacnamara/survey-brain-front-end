// components
import SurveyCard from '../../components/SurveyCard/SurveyCard';

// css
import styles from './Surveys.module.css'

// npm modules
import { NavLink } from 'react-router-dom'

// services
import * as surveyService from '../../services/surveyService'

// types
import { Survey } from '../../types/models'

interface SurveysProps {
  surveys: Survey[],
  setSurveys: (value: Survey[] | ((prevVar: Survey[]) => Survey[])) => void
}

const Surveys = (props: SurveysProps) => {
  const { surveys, setSurveys } = props

  const handleDeleteSurvey = async (surveyId: number): Promise<void> => {
    await surveyService.deleteSurvey(surveyId)
    setSurveys(surveys.filter((survey: Survey) => survey.id !== surveyId))
  }
  
  // const handleDeleteQuestion = async (questionId: number): Promise<void> => {
  //   await surveyService.deleteQuestion(questionId)
  //   setSurveys(surveys.filter((survey: Survey) => survey.id !== surveyId))
  // }

  return (
    <main className={styles.surveysContainer}>
      <div>
        <h1 className={styles.sectionTitle}>Create a survey</h1>
        <NavLink className={styles.newSurveyLink} to="/surveys/create">
          <div className={styles.newSurveyBtn}>
            +
          </div>
        </NavLink>
      </div>
      <div>
        <h1 className={styles.sectionTitle}>My surveys</h1>
        {!surveys.length ?
          <h3>No surveys created yet</h3>
          :
          <div className={styles.surveyCardContainer}>
            {surveys.map((survey: Survey) => (
              <SurveyCard 
                key={survey.id}
                survey={survey}
                handleDeleteSurvey={handleDeleteSurvey} 
              />
            ))}
          </div>
        }
      </div>
    </main>
  );
}

export default Surveys;