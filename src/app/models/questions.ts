import { Quiz } from "./quiz";

export interface Question{
questionId:number,
content:string,
image:string,
option1:string,
option2:string,
option3:string,
option4:string,
answer:string,
quiz:Quiz,
}