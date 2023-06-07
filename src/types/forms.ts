// types
import { Question, ResponseToQuestion } from '../types/models'

/* ---------==== custom forms ====--------- */

export interface NewSurveyFormData {
  title: string;
  description: string;
  questions: Question[];
  surveyQuestions: Question[];
}

export interface EditSurveyFormData {
  title: string;
  description: string;
  surveyQuestions: Question[];
}

export interface SubmitSurveyFormData {
  responses: ResponseToQuestion[];
}

export interface SurveyMetaInfo {
  title: string;
  description: string;
}

/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  curPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
