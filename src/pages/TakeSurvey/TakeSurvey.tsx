// components
import QuestionCard from '../../components/QuestionCard/QuestionCard';

// css
import styles from './TakeSurvey.module.css'

// npm modules
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

// services
import * as surveyService from '../../services/surveyService'

// types
import { Survey } from '../../types/models'

const TakeSurvey = () => {
  const {surveyId} = useParams()
  const [survey, setSurvey] = useState<Survey | null>(null)

  useEffect(() => {
    const fetchSurvey = async () => {
      const data = await surveyService.show(surveyId)
      setSurvey(data)
    }
    fetchSurvey()
  }, [surveyId])

  if(!survey) return <h1>Loading...</h1>

  return (  
    <main className={styles.takeSurveyContainer}>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      
    </main>
  );
}

export default TakeSurvey;