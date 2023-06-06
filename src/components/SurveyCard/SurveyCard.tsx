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
    <article className={styles.surveyCard}>
      <h3>{survey.title}</h3>
      <Link to={`${survey.id}`}>
        Edit survey
      </Link>
    </article>
  );
}

export default SurveyCard;