// css & assets
import styles from './SurveyCard.module.css'

// npm modules
import { Link } from "react-router-dom"

// types
import { Survey } from '../../types/models';

interface SurveyCardProps {
  survey: Survey
}

const SurveyCard = (props: SurveyCardProps): JSX.Element => {
  const { survey } = props

  return (  
    <Link to={`/surveys/`}>
      <article className={styles.surveyCard}>
        <h3>{survey.title}</h3>
      </article>
    </Link>
  );
}

export default SurveyCard;