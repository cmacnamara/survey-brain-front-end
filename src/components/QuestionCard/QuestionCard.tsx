// css
import styles from './QuestionCard.module.css'

// npm modules
import { useState } from 'react';

// types
import { Question } from '../../types/models'
import { NewSurveyFormData } from '../../types/forms'

interface QuestionCardProps {
  key:number,
  index:number
  question: Question,
  formData: NewSurveyFormData,
  setFormData: (value: NewSurveyFormData | ((prevVar: NewSurveyFormData) => NewSurveyFormData)) => void
}

const QuestionCard = (props: QuestionCardProps) => {
  const [prompt, setPrompt] = useState('')
  const [questionType, setQuestionType] = useState('Free Response')

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(evt.target.value)
    
    //After updating state, use setFormData
    const tempFormData = props.formData
    tempFormData.questions[props.index].prompt = prompt 
    props.setFormData({...tempFormData})
  }

  if(questionType === "Free Response") {
    return (  
      <section className={styles.questionCard}>
        <label className={styles.inputContainer}>
          Choose a type of question
          <select name="type" defaultValue="Free Response">
            <option value="Free Response">Free Response</option>
            <option value="Multiple Choice">Multiple Choice</option>
          </select>
        </label>
        <label className={styles.inputContainer}>
          Write a prompt:
          <input 
            type="text" 
            value={prompt}
            name='questions'
            onChange={handleChange}
          />
        </label>
      </section>
    );
  } else {
    return (
      <section className={styles.questionCard}>
        <p>{props.question.prompt}</p>
        <label className={styles.inputContainer}>
          Choose a type of question
          <select name="type" defaultValue="Multiple Choice">
            <option value="Free Response">Free Response</option>
            <option value="Multiple Choice" selected>Multiple Choice</option>
          </select>
        </label>
      </section>
    )
  }
}

export default QuestionCard;