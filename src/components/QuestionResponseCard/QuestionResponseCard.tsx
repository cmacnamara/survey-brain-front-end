// css
import styles from './QuestionResponseCard.module.css'

// npm modules
import { useState } from 'react';

// types
import { Question, ResponseToQuestion } from '../../types/models'
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

  console.log("FORM DATA IS", props.formData);
  

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedResponse = evt.target.value
    setResponse(updatedResponse)
    
    //After updating state, use setFormData
    const tempFormData = props.formData
    if(!tempFormData.responses[props.index]) {
      tempFormData.responses.push({
        profileId: 0,
        questionId: props.question.id,
        content: updatedResponse
      })
    }
    tempFormData.responses[props.index].content = updatedResponse
    props.setFormData({...tempFormData})
  }

  if(props.question.type === "Free Response") {
    return (  
      <div>
        <h2>{props.index + 1}. {props.question.prompt}</h2>
        <textarea 
          name="response"
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
    <div>
      <h2>{props.index + 1}. {props.question.prompt}</h2>
      {}
    </div>
  );
}

export default QuestionResponseCard;