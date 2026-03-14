import { useGetUserProfileQuery } from "@/store/api/user-profile/user-profile-api"

export const useGetLoggedInUser = () => {
    const { data: getUserLoggedInRes, ...getUserApiState } = useGetUserProfileQuery()
    const getUser = getUserLoggedInRes?.data;

    return { getUser, getUserApiState }
}