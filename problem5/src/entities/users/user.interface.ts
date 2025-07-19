export interface IUserQuery {
  name?: string;
  email?: string;
  age?: number;
  isActive?: boolean;
}

export interface IUserPatch {
  id: string;
  name?: string;
  age?: number;
  summary?: string;
  isActive?: boolean;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  age: number;
  summary: string;
  isActive: boolean;
}
