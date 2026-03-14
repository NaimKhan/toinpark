import { useGetUserProfileQuery } from "@/store/api/user-profile/user-profile-api";

export const useGetUserRole = () => {
  const { data, isLoading, isFetching } = useGetUserProfileQuery();

  const role = data?.data?.role;

  return {
    isAdmin: role === "Admin",
    isSuperAdmin: role === "SuperAdmin",
    isMember: role === "Member",
    isRoleReady: !isLoading && !isFetching && !!role,
  };
};
