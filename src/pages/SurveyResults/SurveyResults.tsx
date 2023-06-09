// components
import QuestionResultCard from '../../components/QuestionResultCard/QuestionResultCard';

// css
import styles from './SurveyResults.module.css'

// npm modules
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

// services
import * as surveyService from '../../services/surveyService'

// types
import { Survey, Question } from '../../types/models'

const SurveyResults = () => {
  const {surveyId} = useParams()
  const [survey, setSurvey] = useState<Survey | null>(null)

  useEffect(() => {
    const fetchSurvey = async () => {
      const data = await surveyService.show(surveyId)
      setSurvey(data)
    }
    fetchSurvey()
  }, [surveyId])  
  
  if(!survey) return <h1>Loading Results...</h1>
  
  return (  
    <main className={styles.surveyResultsContainer}>
      <h1>Results for "{survey.title}"</h1>
      <p className={styles.questionResponseCard}>{survey.description}</p>
      <div className={styles.resultCardContainer}>
        {survey.surveyQuestions ?
          survey.surveyQuestions.map((question:Question, idx:number) => (
            <QuestionResultCard 
              key={idx}
              index={idx}
              question={question}
            />
          ))
        :
        ''
        }
      </div>
    </main>
  );
}

export default SurveyResults;