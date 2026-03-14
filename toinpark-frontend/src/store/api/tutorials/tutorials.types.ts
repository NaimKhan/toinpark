import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TMedia,
  TPaginationArgs,
  TPaginationMeta,
  TString,
} from "../common-api-types";

export type BaseEntity = {
  id: TString;
  createdAt: TString;
  createdBy: TString;
  updatedAt: TString;
  updatedBy: TString;
  deletedAt: TString;
  deletedBy: TString;
};

export type TCategory = BaseEntity & {
  name: TString;
  description: TString;
  isActive: boolean;
};

/**
|--------------------------------------------------
| Create A Tutorial Start
|--------------------------------------------------
*/
export type TCreateTutorial = {
  tutorialCategoryId: TString;
  title: TString;
  description?: TString;
  type: "file" | "link";
  videoFile?: File;
  thumbnail?: File;
  sourceLink?: TString;
  isFeatured: boolean;
};

export type TCreateTutorialRes = TApiResponse<TCreateTutorial>;

/**
|--------------------------------------------------
| Create A Tutorial End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Tutorial  Start
|--------------------------------------------------
*/
export type TUpdateTutorialArgs = {
  id: TString;
  body: Partial<TCreateTutorial> | FormData;
};

export type TUpdateTutorialRes = TApiResponse<TCreateTutorial>;

/**
|--------------------------------------------------
| Update A Tutorial End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update A Tutorial Feature Start
|--------------------------------------------------
*/

export type TUpdateFeatureTutorialArgs = TIdOrSlugOrIdentifier<"id">;

export type TUpdateFeatureTutorialRes = TApiResponse<TCreateTutorial>;

/**
|--------------------------------------------------
| Update A Tutorial Feature End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
|  Get Tutorial Start
|--------------------------------------------------
*/
export type TTutorialData = BaseEntity &
  TCreateTutorial & {
    category?: TCategory;
    isActive?: boolean;
    filePath?: TString;
    videoMedia?: TMedia;
    thumbnailPath?: TString;
    thumbnailMedia?: TMedia;
  };

export type TGetTutorialsData = {
  items: TTutorialData[];
  meta: TPaginationMeta;
};

export type TGetTutorialsRes = TApiResponse<TGetTutorialsData>;

export type TGetTutorialsArgs = TPaginationArgs;

/**
|--------------------------------------------------
| Get Tutorial End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get A Tutorial Start
|--------------------------------------------------
*/
export type TGetATutorialRes = TApiResponse<TTutorialData>;

export type TGetATutorialArgs = TIdOrSlugOrIdentifier<"id">;

/**
|--------------------------------------------------
| Get A Tutorial End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete A Tutorial Start
|--------------------------------------------------
*/

export type TDeleteATutorialArgs = TIdOrSlugOrIdentifier<"id">;

export type TDeleteATutorialRes = TApiResponse<null>;

/**
|--------------------------------------------------
| Delete A Tutorial End
|--------------------------------------------------
*/
