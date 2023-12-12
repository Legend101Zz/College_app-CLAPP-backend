import mongoose, { Document } from 'mongoose';

export interface IBadge {
  category: 'rookie' | 'intermediate' | 'advanced';
}
export interface ITasks {
  taskId: mongoose.Schema.Types.ObjectId;
  taskName: string;
}
export interface IWallet {
  walletId: mongoose.Schema.Types.ObjectId;
  // walletName: string;
}
export interface IGiver extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  Badge: IBadge;
  ResponseTime: number;
  Wallet: IWallet;
  Tasks: ITasks;
  userId: mongoose.Schema.Types.ObjectId;
}
