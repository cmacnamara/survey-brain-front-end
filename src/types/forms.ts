// types
import { Question } from '../types/models'

/* ---------==== custom forms ====--------- */

export interface NewSurveyFormData {
  title: string;
  description: string;
  questions: Question[];
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
