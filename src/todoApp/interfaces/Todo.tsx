import { User } from "./User";

export interface Todo {

    id?: number;
    task?: string;
    description?: string;
    completed?: boolean;
    createdAt?: string;
    updatedAt?: string;
    user?: User;
    deleted?: boolean;
    isNew?: boolean;
  }