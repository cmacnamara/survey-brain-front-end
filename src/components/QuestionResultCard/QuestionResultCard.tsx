// css
import styles from './QuestionResultCard.module.css'

// types
import { Question } from '../../types/models'

interface QuestionCardProps {
  key:number,
  index:number
  question: Question,
}

const QuestionResultCard = (props: QuestionCardProps) => {
  const { question } = props
  
  return (
    <section className={styles.questionCard}>
      <h2>{question.prompt}</h2>
      <ul>
        {question.answerChoices ?
          question.answerChoices.map((answerChoice, idx: number) => (
            <li key={idx}>{answerChoice}</li>
          ))
        :
        ''
        }
      </ul>
      <h3>Responses</h3>
      <ul>
        {question.responses ?
          question.responses.map((response, idx:number) => (
            <li key={idx}>
                {response.content}
            </li>
          ))
        :
        ''
        }
      </ul>
    </section>
  )
}

export default QuestionResultCard;