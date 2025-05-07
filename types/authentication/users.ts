import type { IFile } from "~/types/miscellaneous/files";
import type { TNullable } from "~/types/miscellaneous/generics";

export const SubscriptionPlans = ["STANDARD", "PREMIUM"] as const;
export type ESubscriptionPlan = typeof SubscriptionPlans[number];

export interface IBackUser {
  uuid: string;
  username: string;
  email: string;
  password: string;
  avatarRef?: TNullable<string>;
  subscriptionPlan: ESubscriptionPlan;

  avatar?: TNullable<IFile>;

  createdAt: Date;
  updatedAt: Date;
}
export type IUser = Omit<IBackUser, "password">;

export type IReducedUser = Omit<IBackUser, "avatar">;

export type ICreateUser = Omit<IReducedUser, "uuid" | "subscriptionPlan" | "createdAt" | "updatedAt">;
export type IUpdateUser = Partial<Omit<IReducedUser, "uuid" | "createdAt" | "updatedAt">>;
