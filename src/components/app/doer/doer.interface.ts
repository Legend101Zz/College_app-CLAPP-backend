import mongoose from 'mongoose';
import { json } from 'stream/consumers';

export interface ITasks {
  taskId: mongoose.Schema.Types.ObjectId;
  // taskName: string;
}
export interface IWallet {
  walletId: mongoose.Schema.Types.ObjectId;
  // walletName: string;
}

export enum PrimarySkillEnum {
  VideoEditing = 'Video Editing',
  Web = 'Web Development',
  Copy = 'Copy Writing',
  Digital = 'Digital Animation',
}

export interface ISkills {
  primarySkills: {
    name: PrimarySkillEnum;
    subSkills: {
      name: string;
      // other sub-skill properties
    }[];
    // other primary skill properties
  }[];
  isVerified: boolean;
}

export interface IReviews {
  review: string;
  rating: number;
}
export interface IEducation {
  collegeName: string;
  major: string;
}

export interface IExperience {
  companyName: string;
  position: string;
  startDate: Date;
  endDate: Date;
}
export interface IDoer extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  FullName: string;
  DisName: string;
  Description: string;
  Skills: ISkills[];
  Education: IEducation;
  Experience: IExperience;
  LinkedIn: string;
  walletId: IWallet;
  Tasks: ITasks[];
  Reviews: IReviews[];
  Specialtags: string[];
}


{

  taskid:
  goals : {
   1: basic html , status : 
   2: add css 
   3: add js 
   4 : merge 

  }
}