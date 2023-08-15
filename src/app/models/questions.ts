import { Quiz } from './quiz'; // Import the Quiz interface from the appropriate location

export interface Question {
  questionId: number,
  content: string,
  image: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  answer: string,
  quizId: Quiz // Use the Quiz type here
}
