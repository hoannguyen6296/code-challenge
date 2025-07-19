import mongoose from 'mongoose';
import { IUserRepository } from '../../application/contracts/user';
import { IUser, IUserPatch, IUserQuery } from './user.interface';
import { UserModel } from './user.model';
import {
  customError,
  customErrorCodes,
  customErrorMessages,
} from '../../common/error';

export class UserRepository implements IUserRepository {
  public constructor() {
    const username = encodeURIComponent('code-dev');
    const password = encodeURIComponent('jysfu2-neghod-cebWig');
    const uri = `mongodb+srv://${username}:${password}@code-challenge-dev.lu7oq4o.mongodb.net/` + 
    'problem5?retryWrites=true&w=majority&appName=code-challenge-dev';
    mongoose
      .connect(process.env.MONGO_URI ?? uri)
      .then(() => {
        console.log('MongoDB connected');
      })
      .catch((err: unknown) => {
        console.error('MongoDB connection error:', err);
      });
  }

  public async getById(id: string): Promise<IUser> {
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        throw new customError(
          customErrorCodes.USER_NOT_FOUND,
          customErrorMessages.USER_NOT_FOUND,
        );
      }
      return user.toJSON();
    } catch (err) {
      throw new customError(
        customErrorCodes.REQUEST_FAILED,
        `${customErrorMessages.REQUEST_FAILED}: ${JSON.stringify(err)}`,
      );
    }
  }

  public async getAll(user: IUserQuery): Promise<IUser[]> {
    try {
      // Remove undefined values from query
      const query = Object.fromEntries(
        Object.entries(user).filter(([, value]) => value !== undefined),
      );
      const users = await UserModel.find(query);
      return users.map((user) => user.toObject());
    } catch (err) {
      throw new customError(
        customErrorCodes.REQUEST_FAILED,
        `${customErrorMessages.REQUEST_FAILED}: ${JSON.stringify(err)}`,
      );
    }
  }

  public async create(user: IUser): Promise<IUser> {
    const createdUser = new UserModel(user);
    try {
      await createdUser.save();
      return createdUser.toJSON();
    } catch (err) {
      if (err.code === 11000) {
        throw new customError(
          customErrorCodes.USER_DUPLICATE,
          customErrorMessages.USER_DUPLICATE,
        );
      }
      throw new customError(
        customErrorCodes.USER_CREATE_FAILED,
        `${customErrorMessages.USER_CREATE_FAILED}: ${JSON.stringify(err)}`,
      );
    }
  }

  public async update(user: IUserPatch): Promise<IUser> {
    try {
      const updated = await UserModel.findByIdAndUpdate(user.id, user, {
        new: true,
      });
      if (!updated) {
        throw new customError(
          customErrorCodes.USER_NOT_FOUND,
          customErrorMessages.USER_NOT_FOUND,
        );
      }
      return updated.toJSON();
    } catch (err) {
      throw new customError(
        customErrorCodes.REQUEST_FAILED,
        `${customErrorMessages.REQUEST_FAILED}: ${JSON.stringify(err)}`,
      );
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(id);
    } catch (err) {
      throw new customError(
        customErrorCodes.REQUEST_FAILED,
        `${customErrorMessages.REQUEST_FAILED}: ${JSON.stringify(err)}`,
      );
    }
  }
}
