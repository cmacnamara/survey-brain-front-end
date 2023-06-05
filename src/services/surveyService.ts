// services
import * as tokenService from './tokenService'

// types
import { Survey } from '../types/models'
import { NewSurveyFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/surveys`

async function getAllSurveys(): Promise<Survey[]> {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Survey[]
}

async function createSurvey(newSurveyFormData: NewSurveyFormData): Promise<void> {
  const res = await fetch(`${BASE_URL}/survey`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(newSurveyFormData),
  })
  return await res.json()
}


export { getAllSurveys, createSurvey }