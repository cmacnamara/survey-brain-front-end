// services
import * as tokenService from './tokenService'

// types
import { SentimentAnalysis } from '../types/models'

const BASE_URL = `https://twinword-twinword-bundle-v1.p.rapidapi.com`

const API_KEY = 'b73d86567amsh554971aabf90cf8p1a8a82jsn675322fc9cbe'

async function getSentimentAnalysis(query: string): Promise<SentimentAnalysis> {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'twinword-twinword-bundle-v1.p.rapidapi.com'
    },
    body: new URLSearchParams({
      text: query
    })
  }

  const res = await fetch(`${BASE_URL}/sentiment_analyze/`, options);
  // const result = await res.text();
  // console.log(result);
  return await res.json() as SentimentAnalysis
}

export {
  getSentimentAnalysis
}