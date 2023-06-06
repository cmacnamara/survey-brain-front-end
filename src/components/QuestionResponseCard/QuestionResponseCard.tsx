// css
import styles from './QuestionResponseCard.module.css'

// npm modules
import { useState } from 'react';

// types
import { Question } from '../../types/models'

interface QuestionCardProps {
  question: Question,
}

const QuestionResponseCard = (props: QuestionCardProps) => {

  if(props.question.type === "Free Response") {
    return (  
      <div>
        <h2>{props.question.prompt}</h2>
        <textarea 
          name="response" 
          cols={30} 
          rows={10}>
            Write response here
        </textarea>
      </div>
    );
  }

  return (  
    <div>
      <h2>{props.question.prompt}</h2>
    </div>
  );
}

export default QuestionResponseCard;