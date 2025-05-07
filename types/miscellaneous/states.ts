import type { TNullable } from "~/types/miscellaneous/generics";
import type { IUser } from "~/types/authentication/users";

export interface UserState {
  user: TNullable<IUser>;
  loading: {
    register: boolean;
    login: boolean;
  };
}
