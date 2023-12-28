import { Document } from 'mongoose';

export interface CommonTaskFields {
  title: string;
  description: string;
  category: 'content' | 'web' | 'video' | 'assignment' | 'design';
  deadline: Date;
}

export interface AdditionalFields {
  [key: string]: string;
}

export interface Goal {
  description: string;
  expectedTime: Date;
  status: 'done' | 'not done' | 'in progress';
}

export interface ITask extends CommonTaskFields, Document {
  additionalFields: AdditionalFields;
  goals: Goal[];
}
