import mongoose, { Schema, Document } from 'mongoose';

export interface ICrypto extends Document {
  name: 'bitcoin' | 'ethereum' | 'matic-network';
  symbol: 'BTC' | 'ETH' | 'MATIC';
}

const cryptoMapping: Record<string, string> = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  'matic-network': 'MATIC',
};

const CryptoSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: Object.keys(cryptoMapping),
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
    enum: Object.values(cryptoMapping),
  },
});

CryptoSchema.pre<ICrypto>('save', function (next) {
  const expectedSymbol = cryptoMapping[this.name];

  if (this.symbol !== expectedSymbol) {
    return next(
      new Error(
        `Invalid symbol for ${this.name}. Expected symbol: ${expectedSymbol}`,
      ),
    );
  }

  next();
});

export const Crypto = mongoose.model<ICrypto>('Crypto', CryptoSchema);
