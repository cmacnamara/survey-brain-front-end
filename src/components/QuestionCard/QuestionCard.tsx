// css
import styles from './QuestionCard.module.css'

// npm modules
import { useState } from 'react';

// types
import { Question } from '../../types/models'
import { NewSurveyFormData } from '../../types/forms'

interface QuestionCardProps {
  key:number,
  question: Question,
  formData: NewSurveyFormData,
  handleQuestionPromptChange: (index:number, value:string) => void
}

const QuestionCard = (props: QuestionCardProps) => {
  if(props.question.type === "Free Response") {
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
            value={props.question.prompt}
            name='questions'
            onChange={props.handleQuestionPromptChange(props.key,)}
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