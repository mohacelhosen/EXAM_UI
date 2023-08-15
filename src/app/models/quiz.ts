import { Category } from "./category";

export interface Quiz {
qid:number;
title:string;
description:string;
maxMarks:string;
numberOfQuestions:string;
isActive:boolean;
category:Category;
}