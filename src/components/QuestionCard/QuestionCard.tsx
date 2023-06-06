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
  const []
  if(props.question.type === "Free Response") {
    return (  
      <section className={styles.questionCard}>
        <p>{props.question.prompt}</p>
        <label className={styles.inputContainer}>
          Choose a type of question
          <select name="" id=""></select>
        </label>
      </section>
    );
  } else {
    return (
      <section className={styles.questionCard}>

      </section>
    )
  }
}

export default QuestionCard;