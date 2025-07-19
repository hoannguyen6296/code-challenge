import { User } from "../../domain/entities/user";
import { MongooseUserRepository } from "../../domain/repositories/user";
import { UserRepository } from "../contracts/user";


export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new MongooseUserRepository();
  }

  async getUser(id: string): Promise<User | null> {
    return this.userRepository.getById(id);
  }

  async listUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.update(user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
