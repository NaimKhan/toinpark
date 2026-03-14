import { useGetSystemSettingsQuery } from "@/store/api/system-settings/system-settings-api";

export const useGetSystemSettings = () => {
  const { data: getSystemSettingRes, ...getSystemSettingsApiState } =
    useGetSystemSettingsQuery();
  const getSystemSettings = getSystemSettingRes?.data;

  return { getSystemSettings, getSystemSettingsApiState };
};
