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

type tally = {[key: string] : number}

const QuestionResultCard = (props: QuestionCardProps) => {
  const { question } = props
  const [overallAnalysis, setOverallAnalysis] = useState<SentimentAnalysis>()

  let allResponses = ''
  const answerTally: tally = {}

  if(question.type === 'Multiple Choice') {
    question.responses?.forEach((response) => {
      if(answerTally[response.content]) {
        answerTally[response.content] += 1
      } else {
        answerTally[response.content] = 1
      }
    })
  }

  question.responses?.forEach(response => {
    allResponses += " " + response.content
  })

  useEffect((): void => {
    const fetchAnalysis = async (): Promise<void> => {
        if(overallAnalysis?.author) return
        const analysis = await analysisService.getSentimentAnalysis(allResponses)
        console.log(`CALLING API FOR ${question.prompt}`);
        
        setOverallAnalysis(analysis)
    }
    fetchAnalysis()
  }, [question])

  //console.log("OVERALL ANALYSIS", overallAnalysis);
  
  return (
    <section className={styles.questionResultCard}>
      <h2 className={styles.questionPrompt}>{props.index + 1}. {question.prompt}</h2>
      <ul>
        {question.answerChoices ?
          question.answerChoices.map((answerChoice, idx: number) => (
            <li key={idx}>{answerChoice}</li>
          ))
        :
        ''
        }
      </ul>
      {question.responses?.length ?
        <>
          <div className={styles.analysisCard}>
            <h3 className={styles.analysisTitle}>Analysis</h3>
            <p>Overall, participants felt mostly {overallAnalysis?.type} in their responses</p>
            {question.type === 'Multiple Choice' ?
              <>
                <h3 className={styles.tallyTitle}>Tally of Responses</h3>
                <div className={styles.tallyContainer}>
                  {Object.keys(answerTally).map((answer,idx) => (
                    <p key={idx}>{answer}: {answerTally[answer]}</p>
                  ))}
                </div>
              </>
            :
            ''
            } 
          </div>
          
          {question.type === "Free Response" ?
          <>
            <h3 className={styles.responsesTitle}>Responses</h3>
            <ul className={styles.responseList}>
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
          </>
          :
          ''
          }
          
        </>
      :
      <p>No responses yet</p>
      }
    </section>
  )
}

export default QuestionResultCard;