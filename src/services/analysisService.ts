// types
import { SentimentAnalysis } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/analysis`

async function getSentimentAnalysis(query: string): Promise<SentimentAnalysis> {
  const res = await fetch(`${BASE_URL}/sentiment?query=${query}`)
  return await res.json() as SentimentAnalysis
}

export {
  getSentimentAnalysis
}