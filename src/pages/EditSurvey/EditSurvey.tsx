// components
import QuestionCard from '../../components/QuestionCard/QuestionCard';

// css
import styles from './EditSurvey.module.css'

// npm modules
import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom'

// services
import * as surveyService from '../../services/surveyService'

// types
import { Survey, Question } from '../../types/models'
import { NewSurveyFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const EditSurvey = () => {
  const navigate = useNavigate()
  const {surveyId} = useParams()
  const {state} = useLocation()
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [formData, setFormData] = useState<NewSurveyFormData>(state)
  formData.questions = formData.surveyQuestions
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    const fetchSurvey = async () => {
      const data = await surveyService.show(surveyId)
      setSurvey(data)
    }
    fetchSurvey()
  }, [surveyId])

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

      const surveyMetaInfo = {
        title: formData.title,
        description: formData.description
      }

      if(survey && formData.questions){
        await surveyService.updateSurvey(survey.id, surveyMetaInfo)
        formData.questions.forEach((question, idx:number) => {
          saveQuestion(question, survey.id, idx)
        })
      }

      navigate('/surveys')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  const saveQuestion = async (question: Question, surveyId: number, idx: number): Promise<void> => {
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      if(question) {
        let questionExists;
        if(survey?.surveyQuestions?.length) {
          questionExists = idx < survey?.surveyQuestions?.length
        }

        console.log(`Question with prompt ${question.prompt} exists`, questionExists);
        

        if(questionExists) {
          await surveyService.updateQuestion(surveyId, question.id, question)
        } else {
          await surveyService.createQuestion(question, surveyId)
        }
      }
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  const handleAddQuestion = (): void => {
    const newQuestion = {
      prompt: '',
      type: 'Free Response',
      answerChoices: [],
      required: false,
      edited: false
    }
    const newData = {...formData}
    
    if(newData.questions) {
      newData.questions.push(newQuestion)
    }

    setFormData(newData)
  }

  const { title, description } = formData

  if(!survey) return <h1>Loading...</h1>

  return (
    <main className={styles.editSurveyContainer}>
      <h1>Edit Survey</h1>
      <p className={styles.message}>{message}</p>
      <form autoComplete='off' onSubmit={handleSubmit} className={styles.newSurveyForm}>
        <div>
          <label className={styles.inputContainer}>
            Edit survey name
          <input 
            type="text" 
            value={title} 
            name="title"
            placeholder='Name of your survey' 
            onChange={handleChange} 
          />
          </label>
          <label className={styles.inputContainer}>
            Edit description of your survey
            <textarea 
              value={description} 
              name="description" 
              onChange={handleChange}>
                Edit description of your survey
            </textarea>
          </label>
        </div>

        {formData.questions ?
        formData.questions.map((question,idx) => (
          <QuestionCard 
            key={idx}
            index={idx}
            question={question}
            formData={formData}
            setFormData={setFormData}
          />
        ))
        :
        ''
        }

        <div 
          className={styles.addQuestionBtn}
          onClick={handleAddQuestion}>
            +
        </div>

        <div className={styles.inputContainer}>
          <button
            type='submit'
            className={styles.button}
            onClick={handleSubmit}
          >
            Save
          </button>
          <Link to="/surveys">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
}

export default EditSurvey;