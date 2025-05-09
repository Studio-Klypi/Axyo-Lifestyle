import type { TNullable } from "~/types/miscellaneous/generics";

export interface IQuickTaskCollection {
  id: number;
  userUuid: string;
  name: string;

  tasks?: IQuickTask[];
}
export interface IQuickTask {
  id: number;
  userUuid: string;
  collectionId?: TNullable<number>;
  label: string;
  createdAt: Date;
  completedAt?: TNullable<Date>;

  collection?: TNullable<IQuickTaskCollection>;
}

export type ICreateQTCollection = Omit<IQuickTaskCollection, "id" | "userUuid" | "tasks">;
export type ICreateQT = Omit<IQuickTask, "id" | "userUuid" | "createdAt" | "collection">;

export type IUpdateQTCollection = Partial<ICreateQTCollection>;
export type IUpdateQT = Partial<ICreateQT>;
