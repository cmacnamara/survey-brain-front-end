// services
import * as tokenService from './tokenService'

// types
import { Survey } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/surveys`

async function getAllSurveys(): Promise<Survey[]> {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Survey[]
}

export { getAllSurveys }