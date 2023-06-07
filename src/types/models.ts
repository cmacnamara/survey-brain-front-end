/* ---------===== custom props ====--------- */

export interface Survey {
  id: number;
  title: string;
  description: string;
  profileId: number;
  surveyQuestions?: Question[] | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id?: number;
  prompt: string;
  type: string;
  surveyId?: number;
  answerChoices: string[];
  required: boolean;
  createdAt?: string;
  updatedAt?: string;
  edited: boolean;
}

export interface ResponseToQuestion {
  id?: number;
  profileId?: number;
  questionId: number | undefined;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}
