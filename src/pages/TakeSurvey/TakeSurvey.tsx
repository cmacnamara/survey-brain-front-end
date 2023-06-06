// components
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import QuestionResponseCard from '../../components/QuestionResponseCard/QuestionResponseCard';

// css
import styles from './TakeSurvey.module.css'

// npm modules
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

// services
import * as surveyService from '../../services/surveyService'

// types
import { Survey, Question, Response } from '../../types/models'
import { handleErrMsg } from '../../types/validators'

const TakeSurvey = () => {
  const navigate = useNavigate()
  const {surveyId} = useParams()
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [message, setMessage] = useState('')
  const [responses, setResponses] = useState<Response[]>([])

  useEffect(() => {
    const fetchSurvey = async () => {
      const data = await surveyService.show(surveyId)
      setSurvey(data)
    }
    fetchSurvey()
  }, [surveyId])

  if(!survey) return <h1>Loading...</h1>

  console.log("SURVEY IS", survey);
  
  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      setIsSubmitted(true)
      await surveyService.submitResponses(formData)
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
      setIsSubmitted(false)
    }
  }

  return (  
    <main className={styles.takeSurveyContainer}>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      <p>{message}</p>
      <form action="">
        {survey.surveyQuestions ?
          survey.surveyQuestions.map((question, idx) => (
            <QuestionResponseCard 
              key={idx} 
              question={question}
            />
          )) 
          :
          <h1>No questions</h1> 
        }
        <button type='submit' onSubmit={handleSubmit}>Submit</button>
      </form>
    </main>
  );
}

export default TakeSurvey;