// components
import QuestionResponseCard from '../../components/QuestionResponseCard/QuestionResponseCard';

// css
import styles from './TakeSurvey.module.css'

// npm modules
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

// services
import * as surveyService from '../../services/surveyService'

// types
import { Survey, ResponseToQuestion } from '../../types/models'
import { handleErrMsg } from '../../types/validators'
import { SubmitSurveyFormData } from '../../types/forms'

const TakeSurvey = () => {
  const navigate = useNavigate()
  const {surveyId} = useParams()
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState<SubmitSurveyFormData>({
    responses: []
  })

  useEffect(() => {
    const fetchSurvey = async () => {
      const data = await surveyService.show(surveyId)
      setSurvey(data)
    }
    fetchSurvey()
  }, [surveyId])
  
  if(!survey) return <h1>Loading...</h1>

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      formData.responses.forEach(response => saveResponse(response, survey.id))
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  const saveResponse = async (response: ResponseToQuestion, surveyId: number): Promise<void> => {
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await surveyService.createResponse(surveyId, response)
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  return (  
    <main className={styles.takeSurveyContainer}>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      <p>{message}</p>
      <form 
        autoComplete='off' 
        onSubmit={handleSubmit} 
        className={styles.newSurveyForm}
      >
        {survey.surveyQuestions ?
          survey.surveyQuestions.map((question, idx) => (
            <QuestionResponseCard 
              key={idx}
              index={idx} 
              question={question}
              formData={formData}
              setFormData={setFormData}
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