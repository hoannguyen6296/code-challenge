import mongoose from 'mongoose';
import { UserRepository } from '../../application/contracts/user';
import { User } from '../entities/user';
import { UserModel } from '../model/user';



export class MongooseUserRepository implements UserRepository {
  constructor() {
    const username = encodeURIComponent("code-dev");
    const password = encodeURIComponent("jysfu2-neghod-cebWig");
    const uri =`mongodb+srv://${username}:${password}@code-challenge-dev.lu7oq4o.mongodb.net/?retryWrites=true&w=majority&appName=code-challenge-dev`;
    mongoose.connect(process.env.MONGO_URI || uri)
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.error('MongoDB connection error:', err));
  }

  async getById(id: string): Promise<User | null> {
    try {
      const user = await UserModel.findById(id);
      return user ? { id: user.id, name: user.name, email: user.email, age: user.age, role: user.role, isActive: user.isActive } : null;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch user by ID');
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const users = await UserModel.find();
      return users.map(u => ({ id: u.id, name: u.name, email: u.email, age: u.age, role: u.role, isActive: u.isActive }));
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch all users');
    }
  }

  async create(user: User): Promise<User> {
    try {
      const upserted = await UserModel.findOneAndUpdate(
        { email: user.email },
        { name: user.name, age: user.age, role: user.role, isActive: user.isActive },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return { id: upserted.id, name: upserted.name, email: upserted.email, age: upserted.age, role: upserted.role, isActive: upserted.isActive };
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create or upsert user');
    }
  }

  async update(user: User): Promise<User> {
    try {
      const updated = await UserModel.findByIdAndUpdate(user.id, {
        name: user.name,
        age: user.age,
        role: user.role,
        isActive: user.isActive,
      }, { new: true });
      if (!updated) throw new Error('User not found');
      return { id: updated.id, name: updated.name, email: updated.email, age: updated.age, role: updated.role, isActive: updated.isActive };
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update user');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(id);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to delete user');
    }
  }
}