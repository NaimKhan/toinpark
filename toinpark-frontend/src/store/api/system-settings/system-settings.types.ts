import {
  TApiResponse,
  TIdOrSlugOrIdentifier,
  TMedia,
  TString,
} from "../common-api-types";

/**
|--------------------------------------------------
| Create General Settings Start
|--------------------------------------------------
*/
export type TCreateGeneralSetting = {
  key: TString;
  airdropEventMessage?: TString;
  siteTitle?: TString;
  organizationEmail?: TString;
  telegram?: TString;
  whatsApp?: TString;
  toinConventionRate?: number;
  favicon?: string;
  logo?: string;
  minUSDTWithdrawalAmount?: number;
  platformWithdrawalFeePercentage?: number;
  usdConversionRate?: number;
};

export type TCreateGeneralSettingsArgs = TCreateGeneralSetting;

export type TCreateGeneralSettingsRes = TApiResponse<TCreateGeneralSetting>;

/**
|--------------------------------------------------
| Create General Settings End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get General Settings Start
|--------------------------------------------------
*/

export type TGeneralSettingsArgs = void;

export type TGeneralSetting = {
  // id: TString;
  createdAt: TString;
  updatedAt: TString;
  airdropEventMessage?: TString;
  siteTitle?: TString;
  organizationEmail?: TString;
  telegram?: TString;
  whatsApp?: TString;
  facebookUrl?: TString;
  youtubeUrl?: TString;
  linkedinUrl?: TString;
  instagramUrl?: TString;
  kycBonusToin?: number;
  socialBonusToin?: number;
  entryBonusToin?: number;
  toinConventionRate?: number;
  favicon?: string;
  faviconMedia?: TMedia;
  logo?: string;
  logoMedia?: TMedia;
  pdfMedia?: TMedia;
  minUSDTWithdrawalAmount?: number;
  platformWithdrawalFeePercentage?: number;
  usdConversionRate?: number;
};

export type TGeneralSettingsRes = TApiResponse<TGeneralSetting>;

/**
|--------------------------------------------------
| Get General Settings End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get A Single General Settings Start
|--------------------------------------------------
*/

export type TGetAGeneralSettingsArgs = TIdOrSlugOrIdentifier<"key">;

export type TGetAGeneralSettingsRes = TApiResponse<TGeneralSetting>;

/**
|--------------------------------------------------
| Get A Single General Settings End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update General Settings Start
|--------------------------------------------------
*/

export type TUpdateGeneralSettingsArgs = {
  body: Partial<TCreateGeneralSetting> | FormData;
};

export type TUpdateGeneralSettingsRes = TApiResponse<TGeneralSetting>;

/**
|--------------------------------------------------
| Update General Settings End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Update General Settings Start
|--------------------------------------------------
*/

export type TUpdateConventionRateArgs = {
  body: {
    value: string;
    key: string;
  };
};

export type TUpdateConventionRateRes = TApiResponse<TGeneralSetting>;

/**
|--------------------------------------------------
| Update General Settings End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Delete General Settings Start
|--------------------------------------------------
*/

export type TDeleteAGeneralSettingsArgs = TIdOrSlugOrIdentifier<"key">;

export type TDeleteAGeneralSettingsRes = TApiResponse<TGeneralSetting>;

/**
|--------------------------------------------------
| Delete General Settings End
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| Get PDF Start
|--------------------------------------------------
*/
export type TGetPdfArgs = void;
export type TGetPdfRes = TApiResponse<TMedia>;
/**
|--------------------------------------------------
| Get PDF End
|--------------------------------------------------
*/
