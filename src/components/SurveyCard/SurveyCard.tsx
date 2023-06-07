// css & assets
import styles from './SurveyCard.module.css'

// npm modules
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';

// services
import * as surveyService from '../../services/surveyService'

// types
import { Survey } from '../../types/models';
import { NewSurveyFormData } from '../../types/forms'

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
      <h3>{survey.title}</h3>
      <Link to={`/surveys/${survey.id}`}>
        Take survey
      </Link>
      <Link to={`/surveys/${survey.id}/edit`} state={surveyDetailed}>
        Edit survey
      </Link>
      <Link to={`/surveys/${survey.id}/results`}>
        Results
      </Link>
      <button onClick={() => handleDeleteSurvey(survey.id)}>X</button>
    </article>
  );
}

export default SurveyCard;