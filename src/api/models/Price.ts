import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPrice extends Document {
  crypto: Types.ObjectId;
  price: number;
  marketCap: number;
  change24h: number;
  timestamp: Date;
}

const PriceSchema: Schema = new Schema({
  crypto: { type: Schema.Types.ObjectId, ref: 'Crypto', required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Price = mongoose.model<IPrice>('Price', PriceSchema);
