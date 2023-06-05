// css & assets
import styles from './SurveyCard.module.css'

// npm modules
import { Link } from "react-router-dom"

const SurveyCard = () => {
  return (  
    <Link to={`/surveys/`}>
      <article className={styles.surveyCard}>

      </article>
    </Link>
  );
}

export default SurveyCard;