// components
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import AnalysisCard from '../../components/AnalysisCard/AnalysisCard';
import TallyCard from '../../components/TallyCard/TallyCard';

// css
import styles from './CreateSurvey.module.css'

// npm modules
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

// services
import * as surveyService from '../../services/surveyService'

// types
import { Survey, Question } from '../../types/models'
import { NewSurveyFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const CreateSurvey = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<NewSurveyFormData>({
    title: '',
    description: '',
    questions: []
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      setIsSubmitted(true)
      await surveyService.createSurvey(formData)
      navigate('/surveys')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
      setIsSubmitted(false)
    }
  }

  const { title, description, questions } = formData

  return (
    <main className={styles.createSurveyContainer}>
      <h1>Create Survey</h1>
      <p className={styles.message}>{message}</p>
      <form autoComplete='off' onSubmit={handleSubmit} className={styles.newSurveyForm}>
        <label className={styles.inputContainer}>
          Write a name for your survey
        <input 
          type="text" 
          value={title} 
          name="surveyName"
          placeholder='Name of your survey' 
          onChange={handleChange} 
        />
        </label>
        <label className={styles.inputContainer}>
          Write a description of your survey
        <textarea value={description} name="surveyDescription" onChange={handleChange}>Description of your survey</textarea>
        </label>
      </form>
    </main>
  );
}

export default CreateSurvey;