import { Document } from 'mongoose';

interface CommonTaskFields {
  title: string;
  description: string;
  category: 'content' | 'web' | 'video' | 'assignment' | 'design';
  deadline: Date;
}

interface AdditionalFields {
  [key: string]: string;
}

export interface ITask extends CommonTaskFields, Document {
  additionalFields: AdditionalFields;
}
