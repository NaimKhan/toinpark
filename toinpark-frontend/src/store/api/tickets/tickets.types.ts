import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TNullish,
  TPaginationArgs,
  TPaginationMeta,
  TString,
} from "../common-api-types";

/**
|--------------------------------------------------
| Get My Ticket Start
|--------------------------------------------------
*/
export type TGetMyTicketCategory = {
  id: TString;
  name: TString;
  isActive: boolean | TNullish;
};
export type TGetMyTicketCreator = {
  id: TString;
  email: TString;
  phoneNumber: TString;
  toinAccountNumber: TString;
  firstName: TString;
  lastName: TString;
};
export type TGetMyTickets = {
  id: TString;
  ticketNo: TString;
  subject: TString;
  description: TString;
  ticketCategoryId: TString;
  status: TString;
  priority: TString;
  category: TGetMyTicketCategory;
  creator: TGetMyTicketCreator;
  createdAt: TString;
  createdBy: TString;
  updatedAt: TString;
  updatedBy: TString;
};

export type TGetMyTicketsData = {
  items: TGetMyTickets[];
  meta: TPaginationMeta;
};

export type TGetMyTicketsRes = TApiResponse<TGetMyTicketsData>;

export type TGetMyTicketsArgs = TPaginationArgs;

/**
|--------------------------------------------------
| Get My Ticket End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get A Ticket Start
|--------------------------------------------------
*/
export type TCreator = {
  id: TString;
  email: TString;
  phoneNumber?: TString;
  toinAccountNumber?: TString;
  firstName?: TString;
  lastName?: TString;
};
export type TMessage = {
  id: TString;
  message: TString;
  createdAt: TString;
  sender: TCreator;
};

export type TGetATicket = TGetMyTickets & {
  creator: TCreator;
  messages: TMessage[];
};

export type TGetATicketRes = TApiResponse<TGetATicket>;

export type TGetATicketArgs = TIdOrSlugOrIdentifier<"id">;
/**
|--------------------------------------------------
| Get A Ticket End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
| Get All Tickets Start
|--------------------------------------------------
*/

export type TGetTicketsData = {
  items: TGetMyTickets[];
  meta: TPaginationMeta;
};

export type TGetTicketsRes = TApiResponse<TGetTicketsData>;

export type TGetTicketsArgs = TPaginationArgs;
/**
|--------------------------------------------------
| Get All Tickets End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Create A Ticket Start
|--------------------------------------------------
*/
export type TCreateTicket = {
  subject: TString;
  description: TString;
  ticketCategoryId: TString;
  priority: TString;
};

export type TCreateATicketsRes = TApiResponse<TGetMyTickets>;

export type TCreateATicketsArgs = TCreateTicket;

/**
|--------------------------------------------------
| Create A Ticket End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
| Replay A Ticket Start
|--------------------------------------------------
*/

export type TReplayATicketRes = TApiResponse<TGetATicket>;

export type TReplayATicketArgs = {
  id: string;
  message: TString;
};
/**
|--------------------------------------------------
| Replay A Ticket End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
| Update A Ticket Status Start
|--------------------------------------------------
*/
export enum TicketStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  RESOLVED = "RESOLVED",
}

export type TUpdateTicketStatusArgs = {
  id: string;
  status: TicketStatus;
};

export type TUpdateTicketStatusRes = TApiResponse<TGetATicket>;

/**
|--------------------------------------------------
| Update A Ticket Status End
|--------------------------------------------------
*/
/**
|--------------------------------------------------
| Update A Ticket Priority Start
|--------------------------------------------------
*/
export enum TicketPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export type TUpdateTicketPriorityArgs = {
  id: string;
  priority: TicketPriority;
};

export type TUpdateTicketPriorityRes = TApiResponse<TGetATicket>;

/**
|--------------------------------------------------
| Update A Ticket Priority End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete A Ticket Category Start
|--------------------------------------------------
*/

export type TDeleteATicketArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteATicketRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete A Ticket Category End
|--------------------------------------------------
*/
