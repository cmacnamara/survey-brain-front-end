// components
import QuestionCard from '../../components/QuestionCard/QuestionCard';

// css
import styles from './CreateSurvey.module.css'

// npm modules
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'

// services
import * as surveyService from '../../services/surveyService'

// types
import { Survey, Question } from '../../types/models'
import { NewSurveyFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

interface CreateSurveyProps {
  surveys: Survey[],
  setSurveys: (value: Survey[] | ((prevVar: Survey[]) => Survey[])) => void
}

const CreateSurvey = (props: CreateSurveyProps) => {
  const { surveys, setSurveys } = props
  const navigate = useNavigate()

  const [formData, setFormData] = useState<NewSurveyFormData>({
    title: '',
    description: '',
    questions: [{
      prompt: '',
      type: 'Free Response',
      answerChoices: [],
      required: false,
      edited: false,
    }],
    surveyQuestions: []
  })
  
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

      const surveyMetaInfo = {
        title: formData.title,
        description: formData.description
      }

      const newSurvey = await surveyService.createSurvey(surveyMetaInfo)

      formData.questions.forEach(question => {
        saveQuestion(question, newSurvey.id)
      })

      setSurveys([...surveys, newSurvey])
      navigate('/surveys')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
    }
  }

  const saveQuestion = async (question: Question, surveyId: number): Promise<void> => {
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await surveyService.createQuestion(question, surveyId)
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
    newData.questions.push(newQuestion)

    setFormData(newData)
  }

  const { title, description, questions } = formData

  return (
    <main className={styles.createSurveyContainer}>
      <h1>New Survey</h1>
      <p className={styles.message}>{message}</p>
      <form 
        autoComplete='off' 
        onSubmit={handleSubmit} 
        className={styles.newSurveyForm}
      >
        <div className={styles.inputRContainer}>
          <table className={styles.questionTable}>
            <tr className={styles.paddingBottom}>
              <td>
                <label>
                  Write a name for your survey:
                </label>
              </td>
              <td>
                <input 
                  type="text"
                  className={styles.textInput} 
                  value={title} 
                  name="title"
                  placeholder='Name of your survey' 
                  onChange={handleChange} 
                />
              </td>
            </tr>
            <tr>
              <td>
                <label className={styles.inputContainer}>
                  Write a description of your survey:
                </label>
              </td>
              <td>
                <textarea 
                  value={description}
                  className={styles.descriptionTable} 
                  name="description" 
                  onChange={handleChange}
                  placeholder='Description of your survey'
                  cols={50}
                >
                </textarea>
              </td>
            </tr>
          </table>
        </div>

        {questions.map((question,idx) => (
          <QuestionCard 
            key={idx}
            index={idx}
            question={question}
            formData={formData}
            setFormData={setFormData}
          />
        ))}

        <div 
          className={styles.addQuestionBtn}
          onClick={handleAddQuestion}>
            +
        </div>

        <div className={styles.newSurveyBtnGroup}>
          <button
            type='submit'
            className={styles.createSurveyBtns}
            onClick={handleSubmit}
          >
            Submit
          </button>
          <Link to="/surveys">
            <button className={styles.createSurveyBtns}>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
}

export default CreateSurvey;