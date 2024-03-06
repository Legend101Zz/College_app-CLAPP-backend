import mongoose, { Document, mongo } from 'mongoose';

export interface IDoer {
    doerId: mongoose.Schema.Types.ObjectId;
}

export interface IRoom{
    roomId: mongoose.Schema.Types.ObjectId;
}

export interface ICommunity extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    doer: IDoer[];
    giver: mongoose.Schema.Types.ObjectId;
    manager: mongoose.Schema.Types.ObjectId;
    task: mongoose.Schema.Types.ObjectId;
    rooms: IRoom[];
    createdAt: Date;
}