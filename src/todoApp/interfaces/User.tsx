import { Todo } from "./Todo";

export interface User {

    id?: number;
    email?: string;
    username?: string;
    password?: string;
    enabled?: boolean;
    role?: string;
    todos?: Todo[];
    firstName?: string;
    lastName?: string;

}