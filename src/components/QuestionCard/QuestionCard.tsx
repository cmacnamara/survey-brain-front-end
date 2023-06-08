// components
import AnswerChoiceCard from '../AnswerChoiceCard/AnswerChoiceCard';

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
  const [prompt, setPrompt] = useState(props.question.prompt)
  const [questionType, setQuestionType] = useState(props.question.type)

  const handleAddAnswerChoice = (): void => {
    const newAnswer = ''
    const newData = {...props.formData}
    if(newData.questions)
      newData.questions[props.index].answerChoices.push(newAnswer)

    props.setFormData(newData)
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPrompt = evt.target.value
    setPrompt(updatedPrompt)
    
    //After updating state, use setFormData
    const tempFormData = props.formData
    tempFormData.questions[props.index].prompt = updatedPrompt 
    props.setFormData({...tempFormData})
  }
  
  const handleTypeChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedType = evt.target.value
    setQuestionType(evt.target.value)
  
    //After updating state, use setFormData
    const tempFormData = props.formData
    tempFormData.questions[props.index].type = updatedType 
    props.setFormData({...tempFormData})
  }

  if(questionType === "Free Response") {
    return (  
      <section className={styles.questionCard}>
        <div className={styles.questionTypeRow}>
          <label className={styles.inputContainer}>
            Choose a type of question:
          </label>
          <select 
            name="type" 
            value={questionType}
            onChange={handleTypeChange}
          >
            <option value="Free Response">Free Response</option>
            <option value="Multiple Choice">Multiple Choice</option>
          </select>
        </div>
        <label className={styles.inputContainer}>
          Write a prompt:
          <input 
            type="text" 
            value={prompt}
            name='questions'
            onChange={handleChange}
          />
        </label>
        {/* <button onClick={handleDeleteQuestion}>X</button> */}
      </section>
    );
  } else {
    return (
      <section className={styles.questionCard}>
        <div className={styles.questionTypeRow}>
          <label className={styles.inputContainer}>
            Choose a type of question:
          </label>
          <select 
            name="type" 
            value={questionType}
            onChange={handleTypeChange}
          >
            <option value="Free Response">Free Response</option>
            <option value="Multiple Choice">Multiple Choice</option>
          </select>
        </div>
        <div>
          <label className={styles.inputContainer}>
            Write a prompt:
          </label>
          <input 
            type="text" 
            value={prompt}
            name='questions'
            onChange={handleChange}
          />
        </div>
        <div className={styles.answerChoicesContainer}>
          {props.formData.questions[props.index].answerChoices ?
            props.formData.questions[props.index].answerChoices.map((answerChoice, idx) => (
              <AnswerChoiceCard
                key={idx}
                questionIndex={props.index}
                index={idx}
                answerChoice={answerChoice}
                formData={props.formData}
                setFormData={props.setFormData} 
              />
            ))
          :
          ''
          }
        </div>
        <div 
          className={styles.addAnswerChoiceBtn}
          onClick={handleAddAnswerChoice}>
            +
        </div>
      </section>
    )
  }
}

export default QuestionCard;