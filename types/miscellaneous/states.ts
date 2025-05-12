import type { TNullable } from "~/types/miscellaneous/generics";
import type { IUser } from "~/types/authentication/users";
import type { IQuickTask } from "~/types/productivity/quick-tasks";

export interface UserState {
  user: TNullable<IUser>;
  loading: {
    register: boolean;
    login: boolean;
  };
}

export interface QuickTasksState {
  tasks: IQuickTask[];
  loading: {
    creating: boolean;
    deleting: boolean;
    recovering: boolean;
  };
}
