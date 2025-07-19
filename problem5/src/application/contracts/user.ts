import { IUser, IUserPatch, IUserQuery } from '../../entities/users/user.interface';

export interface IUserRepository {
  getById(id: string): Promise<IUser>;
  getAll(user: IUserQuery): Promise<IUser[]>;
  create(user: IUser): Promise<IUser>;
  update(user: IUserPatch): Promise<IUser>;
  delete(id: string): Promise<void>;
}
