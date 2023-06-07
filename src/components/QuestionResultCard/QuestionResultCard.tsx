// components
import AnswerChoiceCard from '../AnswerChoiceCard/AnswerChoiceCard';

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
  const { index, question } = props
  if(question.type === "Free Response") {
    return (  
      <section className={styles.questionCard}>
        <h2>{question.prompt}</h2>
      </section>
    );
  } else {
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
      </section>
    )
  }
}

export default QuestionResultCard;