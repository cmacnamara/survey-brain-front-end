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
    questions: [{
      id: 0,
      prompt: '',
      type: 'Multiple Choice',
      surveyId: 0,
      answerChoices: [],
      required: false,
      createdAt: '',
      updatedAt: '',
      edited: false
    }]
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

      //create an object that just contains survey title and description. use that to send to create survey
      const surveyMetaInfo = {
        title: formData.title,
        description: formData.description
      }

      const newSurvey = await surveyService.createSurvey(surveyMetaInfo)

      // map through and await creating each question, within which await creating each response option
      formData.questions.forEach(question => {
        saveQuestion(question, newSurvey.id)
      })

      navigate('/surveys')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
      setIsSubmitted(false)
    }
  }

  const saveQuestion = async (question: Question, surveyId: number): Promise<void> => {
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      const newQuestion = await surveyService.createQuestion(question, surveyId)
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
      setIsSubmitted(false)
    }
  }

  const handleAddQuestion = (): void => {
    const newQuestion = {
      prompt: '',
      type: 'Multiple Choice',
      answerChoices: [],
      required: false,
      edited: false
    }
    setFormData((formData) => {
      const newData = {...formData}
      newData.questions.push(newQuestion)
      return newData
    })
  }

  const { title, description, questions } = formData

  return (
    <main className={styles.createSurveyContainer}>
      <h1>Create Survey</h1>
      <p className={styles.message}>{message}</p>
      <form autoComplete='off' onSubmit={handleSubmit} className={styles.newSurveyForm}>
        <div>
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
            <textarea 
              value={description} 
              name="surveyDescription" 
              onChange={handleChange}>
                Description of your survey
            </textarea>
          </label>
        </div>

        {questions.map((question,idx) => (
          <QuestionCard 
            key={idx}
            question={question}
          />
        ))}

        <button 
          className={styles.addQuestionBtn}
          onClick={handleAddQuestion}
          >
            +
        </button>

      </form>
    </main>
  );
}

export default CreateSurvey;