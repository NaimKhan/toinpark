"use client";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import SettingsIcon from "@/components/svg/SettingsIcon";
import LogoutIcon from "@/components/svg/LogoutIcon";
import { useSignoutMutation } from "@/store/api/auth/auth-api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "@/components/navigation";
import Loader from "@/components/feature/loader/loader";
import { useGetLoggedInUser } from "@/hooks/feature/useGetLoggedInUser";
import { useGetUserRole } from "@/hooks/feature/useGetUserRole";
import { getFallbackImage } from "@/lib/media/getFallbackImage";
import UserIcon from "@/components/svg/UserIcon";
import useDefaultLocale from "@/hooks/useDefaultLocale";
import { useState } from "react";

function UserProfile() {
  const [signout, { isLoading }] = useSignoutMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const local = useDefaultLocale();
  const { getUser } = useGetLoggedInUser();
  const { isAdmin, isMember, isSuperAdmin } = useGetUserRole();
  const handleSignout = async () => {
    const role = getUser?.role as string | undefined;
    try {
      await signout({ role }).unwrap();
      toast({
        variant: "success",
        title: "Signed out",
        description: "You have been signed out.",
      });
      const redirectPath =
        role === "Admin" || role === "SuperAdmin" ? "/admin-login" : "/";
      router.replace(redirectPath);
    } catch (error) {
      if (role) {
        Cookies.remove(`authinfo-${role}`);
      } else {
        Cookies.remove("authinfo-Admin");
        Cookies.remove("authinfo-SuperAdmin");
        Cookies.remove("authinfo-Member");
      }
      router.replace("/");
      console.error("Failed to signout", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <DropdownMenu
      modal={false}
      open={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button className="w-10 lg:w-12 h-10 lg:h-12 rounded-full overflow-hidden border-0 bg-transparent p-0">
          <Image
            src={getFallbackImage({ src: getUser?.media?.url })}
            alt="Profile Image"
            width={100}
            height={100}
            className="rounded-full size-10 lg:size-12 hover:scale-95 transition-all ease-in-out duration-300 object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px] rounded-lg shadow-lg mt-2 mr-6 lg:mr-16 p-0 flex flex-col border-none bg-gradient-to-b from-[#040706] to-[#0F1212]">
        {isMember && (
          <>
            <Link
              href={`/${local}/user/profile`}
              className="text-left text-base font-medium text-default-100 hover:text-primary transition px-6 py-5 flex items-center gap-2"
              onClick={() => setIsDropdownOpen(false)}
            >
              <UserIcon className="w-6 h-6" />
              Profile
            </Link>
            <Link
              href={`/${local}/user/settings`}
              className="text-left text-base font-medium text-default-100 hover:text-primary transition px-6 py-5 flex items-center gap-2"
              onClick={() => setIsDropdownOpen(false)}
            >
              <SettingsIcon className="w-6 h-6" />
              Settings
            </Link>
          </>
        )}
        {(isAdmin || isSuperAdmin) && (
          <>
            <Link
              href={`/${local}/admin/settings/profile-settings`}
              className="text-left text-base font-medium text-default-100 hover:text-primary transition px-6 py-5 flex items-center gap-2"
              onClick={() => setIsDropdownOpen(false)}
            >
              <UserIcon className="w-6 h-6" />
              Profile
            </Link>
            <Link
              href={`/${local}/admin/settings`}
              className="text-left text-base font-medium text-default-100 hover:text-primary transition px-6 py-5 flex items-center gap-2"
              onClick={() => setIsDropdownOpen(false)}
            >
              <SettingsIcon className="w-6 h-6" />
              Settings
            </Link>
          </>
        )}
        <Separator />
        <button
          onClick={handleSignout}
          type="button"
          className="text-left cursor-pointer text-base font-medium text-destructive hover:text-destructive/80 transition px-6 py-5 flex items-center gap-2"
        >
          <LogoutIcon className="w-6 h-6" />
          Logout
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfile;
