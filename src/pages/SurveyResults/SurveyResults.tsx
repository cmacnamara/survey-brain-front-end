// components
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import QuestionResultCard from '../../components/QuestionResultCard/QuestionResultCard';

// css
import styles from './SurveyResults.module.css'

// npm modules
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

// services
import * as surveyService from '../../services/surveyService'

// types
import { Survey, Question, ResponseToQuestion } from '../../types/models'
import { handleErrMsg } from '../../types/validators'
import { SubmitSurveyFormData } from '../../types/forms'

const SurveyResults = () => {
  const navigate = useNavigate()
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
    <main className={styles.takeSurveyContainer}>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
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
    </main>
  );
}

export default SurveyResults;