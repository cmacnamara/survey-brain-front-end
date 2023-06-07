// css
import styles from './QuestionResultCard.module.css'

// npm modules
import { useState, useEffect } from 'react'

// services
import * as analysisService from '../../services/analysisService'

// types
import { Question, SentimentAnalysis } from '../../types/models'

interface QuestionCardProps {
  key:number,
  index:number
  question: Question,
}

const QuestionResultCard = (props: QuestionCardProps) => {
  const { question } = props
  const [overallAnalysis, setOverallAnalysis] = useState<SentimentAnalysis>()

  let allResponses = ''

  question.responses?.forEach(response => {
    allResponses += " " + response.content
  })

  useEffect((): void => {
    const fetchAnalysis = async (): Promise<void> => {
        if(overallAnalysis?.score) return
        const analysis = await analysisService.getSentimentAnalysis(allResponses)
        setOverallAnalysis(analysis)
    }
    fetchAnalysis()
  })

  console.log("OVERALL ANALYSIS", overallAnalysis);
  
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
      <div>
        <h3>Analysis</h3>
        <p>Overall, participants felt mostly {overallAnalysis?.type} in their responses</p>
      </div>
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