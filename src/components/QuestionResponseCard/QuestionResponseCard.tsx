// css
import styles from './QuestionResponseCard.module.css'

// npm modules
import { useState } from 'react';

// types
import { Question } from '../../types/models'
import { SubmitSurveyFormData } from '../../types/forms'

interface QuestionResponseCardProps {
  key: number,
  index:number,
  question: Question,
  formData: SubmitSurveyFormData,
  setFormData: (value: SubmitSurveyFormData | ((prevVar: SubmitSurveyFormData) => SubmitSurveyFormData)) => void
}

const QuestionResponseCard = (props: QuestionResponseCardProps) => {
  const [response, setResponse] = useState('')

  console.log("ID for " + props.question.prompt + " is " + props.question.id);
  
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    const updatedResponse = evt.target.value
    setResponse(updatedResponse)
    
    const tempFormData = props.formData
    if(!tempFormData.responses[props.index]) {
      tempFormData.responses.push({
        questionId: props.question.id,
        content: updatedResponse
      })
    } else {
      tempFormData.responses[props.index].content = updatedResponse
    }
    props.setFormData({...tempFormData})
  }

  if(props.question.type === "Free Response") {
    return (  
      <div className={styles.questionResponseCard}>
        <h2 className={styles.questionTitle}>{props.index + 1}. {props.question.prompt}</h2>
        <textarea 
          name="response"
          className={styles.frTextBox}
          placeholder='Write response here'
          value={response} 
          cols={30} 
          rows={10}
          onChange={handleChange}
          >
            Write response here
        </textarea>
      </div>
    );
  }

  return (  
    <div className={styles.questionResponseCard}>
      <h2 className={styles.questionTitle}>{props.index + 1}. {props.question.prompt}</h2>
      {props.question.answerChoices ?
      <div className={styles.mcOptions}>
        {props.question.answerChoices.map((answerChoice,idx) => (
          <div key={idx} className={styles.mcOption}>
            <input
              type="radio"
              name={`question${props.question.id}`}
              value={answerChoice}
              id={`choice${idx}`}
              className={styles.radioInput}
              checked={response === answerChoice}
              onChange={handleChange} 
            />
            <label htmlFor={`choice${idx}`}>{answerChoice}</label>
          </div>
          ))}
      </div>
      :
      ''
      }
    </div>
  );
}

export default QuestionResponseCard;