export interface Choice {
    id: number;
    text: string;
    imageUrl?: string;
  }
  
export interface MCQQuestionData {
    id: string;
    class_: string;
    subject: string;
    topic: string;
    question: string;
    options: string[];
    answers: string[];
    captions:string[];
    resource: string[];
    used: boolean;
  }
export interface FillBlankQuestionData {
    id: string;
    class_: string;
    subject: string;
    topic: string;
    question: string;
    choices: string[];
    answers: string[];
    resource: string[];
    used: boolean;
  }
export interface TrueFalseQuestionData {
    id: string;
    class_: string;
    subject: string;
    topic: string;
    question: string;
    answer: string;
    resource: string;
    used: boolean;
  }
