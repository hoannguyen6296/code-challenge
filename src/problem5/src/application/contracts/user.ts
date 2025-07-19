import { User } from "../../domain/entities/user";

export interface UserRepository {
  getById(id: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
