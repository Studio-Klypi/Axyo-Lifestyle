import type { TNullable } from "~/types/miscellaneous/generics";

export interface IQuickTask {
  id: number;
  userUuid: string;
  label: string;
  createdAt: Date;
  completedAt?: TNullable<Date>;
}

export type ICreateQT = Omit<IQuickTask, "id" | "userUuid" | "createdAt">;

export type IUpdateQT = Partial<ICreateQT>;
