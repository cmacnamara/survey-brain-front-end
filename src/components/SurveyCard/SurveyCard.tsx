// css & assets
import styles from './SurveyCard.module.css'

// npm modules
import { Link } from "react-router-dom"

// types
import { Survey } from '../../types/models';

interface SurveyCardProps {
  survey: Survey,
  handleDeleteSurvey: (surveyId: number) => void
}

const SurveyCard = (props: SurveyCardProps): JSX.Element => {
  const { survey, handleDeleteSurvey } = props

  return (  
    <article className={styles.surveyCard}>
      <h3>{survey.title}</h3>
      <Link to={`/surveys/${survey.id}`}>
        Take survey
      </Link>
      <Link to={`/surveys/${survey.id}/edit`} state={survey}>
        Edit survey
      </Link>
      <button onClick={() => handleDeleteSurvey(survey.id)}>X</button>
    </article>
  );
}

export default SurveyCard;