// css
import styles from './AnswerChoiceCard.module.css'

// npm modules
import { useState } from 'react';

// types
import { NewSurveyFormData } from '../../types/forms'

interface AnswerChoiceCardProps {
  key:number,
  questionIndex:number,
  index:number,
  answerChoice:string,
  formData: NewSurveyFormData,
  setFormData: (value: NewSurveyFormData | ((prevVar: NewSurveyFormData) => NewSurveyFormData)) => void
}

const AnswerChoiceCard = (props: AnswerChoiceCardProps) => {
  const [answerChoiceText, setAnswerChoiceText] = useState(props.answerChoice)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAnswerChoice = evt.target.value
    setAnswerChoiceText(updatedAnswerChoice)
    
    //After updating state, use setFormData
    const tempFormData = props.formData
    tempFormData.questions[props.questionIndex].answerChoices[props.index] = updatedAnswerChoice 
    props.setFormData({...tempFormData})
  }

  return (
    <div>
      <label className={styles.inputContainer}>
        Answer Option {`${props.index + 1}`}:
        <input 
          type="text" 
          value={answerChoiceText}
          name='answerChoice'
          onChange={handleChange}
        />
      </label>
    </div>
  )
}

export default AnswerChoiceCard;