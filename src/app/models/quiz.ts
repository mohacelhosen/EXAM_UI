import { Category } from "./category";

export interface Quiz {
quizId:number;
title:string;
description:string;
maxMarks:string;
numberOfQuestions:string;
isActive:boolean;
categoryObject:Category;
}