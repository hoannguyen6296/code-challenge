import { Schema, Document, model } from 'mongoose';
import { maxInputLength, minInputLength } from '../../common/constant';

interface UserDoc extends Document {
  name: string;
  email: string;
  age: number;
  summary: string;
  isActive: boolean;
}

const UserSchema = new Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, immutable: true },
  age: { type: Number, required: true, min: 0 },
  summary: { type: String, required: true, max: maxInputLength, min: minInputLength },
  isActive: { type: Boolean, required: true },
});

export const UserModel = model<UserDoc>('User', UserSchema);