// services
import * as tokenService from './tokenService'

// types
import { Survey, Question, ResponseToQuestion } from '../types/models'
import { SurveyMetaInfo } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/surveys`

async function getAllSurveys(): Promise<Survey[]> {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Survey[]
}

async function createSurvey(newSurveyFormData: SurveyMetaInfo): Promise<Survey> {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(newSurveyFormData),
  })
  return await res.json() as Survey
}

async function createQuestion(question: Question, surveyId: number): Promise<Question> {
  const res = await fetch(`${BASE_URL}/${surveyId}/questions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(question),
  })
  return await res.json() as Question
}

async function show(surveyId: string | undefined): Promise<Survey> {
  const res = await fetch(`${BASE_URL}/${surveyId}`, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Survey
}

async function createResponse(surveyId: number, response: ResponseToQuestion): Promise<ResponseToQuestion> {
  const res = await fetch(`${BASE_URL}/${surveyId}/questions/${response.questionId}/responses`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
  })
  return await res.json() as ResponseToQuestion
}

async function deleteSurvey(surveyId: number): Promise<Survey> {
  const res = await fetch(`${BASE_URL}/${surveyId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
  })
  return await res.json() as Survey
}

export { 
  getAllSurveys, 
  createSurvey, 
  createQuestion, 
  show, 
  createResponse, 
  deleteSurvey 
}