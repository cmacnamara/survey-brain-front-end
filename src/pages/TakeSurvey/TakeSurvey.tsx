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
import { Survey, Question } from '../../types/models'

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

  console.log("SURVEY IS", survey);
  

  return (  
    <main className={styles.takeSurveyContainer}>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      <form action="">
        {survey.surveyQuestions ?
          survey.surveyQuestions.map((question, idx) => (
            <h3 key={idx}>{question.prompt}</h3>
          )) 
          :
          <h1>No questions</h1> 
        }
      </form>
    </main>
  );
}

export default TakeSurvey;