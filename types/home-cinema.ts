import type { TNullable } from "~/types/miscellaneous/generics";
import type { IFile } from "~/types/miscellaneous/files";
import type { IUser } from "~/types/authentication/users";

export const MediaTypes = ["MOVIE", "TV_SERIES"] as const;
export const MediaNotations = ["BAD", "GOOD", "VERY_GOOD"] as const;

export type EMediaType = typeof MediaTypes[number];
export type EMediaNotation = typeof MediaNotations[number];

export interface IMediaEntity {
  id: number;
  type: EMediaType;
  title: string;
  synopsis: string;
  posterRef?: TNullable<string>;
  year: number;
  genders: string[];
  actors: string[];
  duration: number;
  createdAt: Date;

  poster?: TNullable<IFile>;
  savedBy?: Pick<IUser, "uuid">[];
  status?: IMediaStatus[];
}
export interface IWatchlist {
  userUuid: string;
  mediaId: number;
  createdAt: Date;

  user?: IUser;
  media?: IMediaEntity;
}
export interface IMediaStatus {
  userUuid: string;
  mediaId: number;
  note?: TNullable<EMediaNotation>;
  viewedAt?: TNullable<Date>;
  createdAt: Date;

  media?: IMediaEntity;
}

export type ICreateMediaEntity = Omit<IMediaEntity, "id" | "createdAt" | "poster" | "savedBy" | "status">;
export type ICreateMediaStatus = Omit<IMediaStatus, "userUuid" | "mediaId" | "createdAt" | "media">;
export type IUpdateMediaStatus = Partial<ICreateMediaStatus>;
