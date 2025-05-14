import type { TNullable } from "~/types/miscellaneous/generics";
import type { IUser } from "~/types/authentication/users";
import type { IQuickTask } from "~/types/productivity/quick-tasks";
import type { IMediaEntity, IMediaStatus } from "~/types/home-cinema";

export interface UserState {
  user: TNullable<IUser>;
  loading: {
    register: boolean;
    login: boolean;
  };
}

export interface QuickTasksState {
  tasks: IQuickTask[];
  search: string;
  loading: {
    creating: boolean;
    deleting: boolean;
    recovering: boolean;
  };
}

export interface HomeCinemaState {
  database: IMediaEntity[];
  status: IMediaStatus[];
  firstLoading: boolean;
  loading: boolean;
}
