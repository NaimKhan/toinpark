import { TApiResponse, TPaginationArgs, TPaginationMeta, TString } from "../common-api-types";

export type TNotification = {
  id: TString;
  userId: TString;
  type: TString;
  title: TString;
  message: TString;
  data?: Record<string, any>;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  [key: string]: any;
}


export type TGetNotificationsData = {
  items: TNotification[];
  meta: TPaginationMeta;
};

export type TGetNotificationsRes =
  TApiResponse<TGetNotificationsData>;
export type TGetNotificationsArgs = TPaginationArgs ;



export type TUnreadCountResponse = TApiResponse<{ count: number }>;
