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
  _id?: any;
  description: string;
  expectedTime: Date;
  status: 'done' | 'notDone' | 'inProgress';
}

export interface ITask extends CommonTaskFields, Document {
  additionalFields: AdditionalFields;
  goals: Goal[];
  status: 'draft' | 'inProgress' | 'done';
}
