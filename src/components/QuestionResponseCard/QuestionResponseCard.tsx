// css
import styles from './QuestionResponseCard.module.css'

// npm modules
import { useState } from 'react';

// types
import { Question, ResponseToQuestion } from '../../types/models'

interface QuestionResponseCardProps {
  key: number,
  question: Question,
  responses: ResponseToQuestion[],
  handleResponseChange: (evt: React.ChangeEvent<HTMLTextAreaElement>, idx:number) => void,
}

const QuestionResponseCard = (props: QuestionResponseCardProps) => {

  if(props.question.type === "Free Response") {
    return (  
      <div>
        <h2>{props.question.prompt}</h2>
        <textarea 
          name="response"
          value={props.responses[0].content} 
          cols={30} 
          rows={10}
          // onChange={props.handleResponseChange(evt, props.key)}
          >
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