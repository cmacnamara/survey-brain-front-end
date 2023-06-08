// css & assets
import styles from './SurveyCard.module.css'

// npm modules
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';

// services
import * as surveyService from '../../services/surveyService'

// types
import { Survey } from '../../types/models';

interface SurveyCardProps {
  survey: Survey,
  handleDeleteSurvey: (surveyId: number) => void
}

const SurveyCard = (props: SurveyCardProps): JSX.Element => {
  const { survey, handleDeleteSurvey } = props
  const [surveyDetailed, setSurveyDetailed] = useState<Survey|null>(null)

  useEffect(() => {
    const fetchSurvey = async () => {
      const data = await surveyService.show(props.survey.id.toString())
      setSurveyDetailed(data)
    }
    fetchSurvey()
  }, [props.survey.id])
  
  return (  
    <article className={styles.surveyCard}>
      <div className={styles.surveyCardHeader}>
        <h3 className={styles.surveyCardTitle}>{survey.title}</h3>
        <button onClick={() => handleDeleteSurvey(survey.id)}>Delete</button>
      </div>
      <div className={styles.btnContainer}>
        <Link to={`/surveys/${survey.id}`}>
          <button className={styles.cardButton}>Take survey</button>
        </Link>
        <Link to={`/surveys/${survey.id}/edit`} state={surveyDetailed}>
          <button className={styles.cardButton}>Edit survey</button>
        </Link>
        <Link to={`/surveys/${survey.id}/results`}>
          <button className={styles.cardButton}>Results</button>
        </Link>
      </div>
    </article>
  );
}

export default SurveyCard;