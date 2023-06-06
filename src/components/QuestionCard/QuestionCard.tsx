// css
import styles from './QuestionCard.module.css'

// npm modules
import { useState } from 'react';

// types
import { Question } from '../../types/models'

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = (props: QuestionCardProps) => {
  if(props.question.type === "Free Response") {
    return (  
      <section className={styles.questionCard}>
        <p>{props.question.prompt}</p>
        <label className={styles.inputContainer}>
          Choose a type of question
          <select name="type">
            <option value="Free Response" selected>Free Response</option>
            <option value="Multiple Choice">Multiple Choice</option>
          </select>
        </label>
      </section>
    );
  } else {
    return (
      <section className={styles.questionCard}>
        <p>{props.question.prompt}</p>
        <label className={styles.inputContainer}>
          Choose a type of question
          <select name="type">
            <option value="Free Response">Free Response</option>
            <option value="Multiple Choice" selected>Multiple Choice</option>
          </select>
        </label>
      </section>
    )
  }
}

export default QuestionCard;