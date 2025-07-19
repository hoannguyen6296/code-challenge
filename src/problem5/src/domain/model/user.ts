import { Schema, Document, model } from 'mongoose';

interface UserDoc extends Document {
  name: string;
  email: string;
  age: number;
  role: string;
  isActive: boolean;
}

const UserSchema = new Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, immutable: true },
  age: { type: Number, required: true },
  role: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

export const UserModel = model<UserDoc>('User', UserSchema);