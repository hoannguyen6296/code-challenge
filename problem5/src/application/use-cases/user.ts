import { IUser, IUserPatch, IUserQuery } from '../../entities/users/user.interface';
import { UserRepository } from '../../entities/users/user.repository';
import { IUserRepository } from '../contracts/user';


export class UserService {
  private userRepository: IUserRepository;
  public constructor() {
    this.userRepository = new UserRepository();
  }

  public async getUser(id: string): Promise<IUser> {
    return this.userRepository.getById(id);
  }

  public async listUsers(user: IUserQuery): Promise<IUser[]> {
    return this.userRepository.getAll(user);
  }

  public createUser(user: IUser): Promise<IUser> {
    return this.userRepository.create(user);
  }

  public async updateUser(user: IUserPatch): Promise<IUser> {
    return this.userRepository.update(user);
  }

  public async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
