export type TNullish = null | undefined;
export type TString = string | TNullish;
export type TNumber = number | TNullish;

export type TPaginationMeta = {
  total: TNumber;
  page: TNumber;
  limit: TNumber;
  totalPages: TNumber;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type TPagination = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};
export type TMedia = {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  extension: string;
  createdAt: string;
};

export type TApiResponse<
  T extends
    | Record<string, unknown>
    | Array<Record<string, unknown>>
    | Array<string>
    | Array<number>
    | string
    | null
    | undefined = null,
> =
  | {
      success: boolean;
      message: string;
      data: T | TNullish;
      statusCode: number;
      pagination: TPagination | undefined;
    }
  | TNullish;
export type TIdOrSlugOrIdentifier<
  TChooseIdOrSlug extends "id" | "slug" | "key" | "identifier" = "id",
> = TChooseIdOrSlug extends "id"
  ? { id: number | string | TNullish }
  : TChooseIdOrSlug extends "slug"
    ? { slug: string | TNullish }
    : TChooseIdOrSlug extends "key"
      ? { key: string | TNullish }
      : { identifier: string | TNullish };

export type TUpdateOptionalArgs<
  TUpdateSchema extends Record<string, unknown> | null | undefined,
  TChooseIdOrSlug extends "id" | "key" | "slug" | "identifier" = "id",
> = {
  body: Partial<TUpdateSchema>;
} & TIdOrSlugOrIdentifier<TChooseIdOrSlug>;

export type TErrorResponse = {
  success: boolean;
  message: string;
  error: string;
  statusCode: number;
};

export enum ESortOrder {
  ASC = "asc",
  DESC = "desc",
}

export type TSortOrder = `${ESortOrder}`;

export enum EStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export type TStatus = `${EStatus}`;

export enum EGender {
  Male = "male",
  Female = "female",
  Unisex = "unisex",
  Not_Specified = "NOT_SPECIFIED",
}
export type TGender = `${EGender}`;

export enum EAudienceType {
  Member = "MEMBER",
  System_User = "SYSTEM_USER",
}
export type TAudienceType = `${EAudienceType}`;

export type TSortArgs<
  TSingleObjectOfResponseType extends Record<string, unknown> | void = void,
> =
  TSingleObjectOfResponseType extends Record<string, unknown>
    ? { sortBy?: keyof TSingleObjectOfResponseType; sortOrder?: TSortOrder }
    : Record<string, unknown>;

export type TPaginationArgs<
  TSingleObjectOfResponseType extends Record<string, unknown> | void = void,
  TExtraFilteringArgs extends Record<string, unknown> = Record<string, unknown>,
> =
  | ({
      page?: number | string;
      limit?: number | string;
      search?: string;
    } & TSortArgs<TSingleObjectOfResponseType> &
      TExtraFilteringArgs)
  | undefined
  | void;

export type TApiErrorResponse = {
  success: boolean;
  message?: string;
  errors?:
    | {
        message?: string;
      }[]
    | string;
  statusCode: number;
};
