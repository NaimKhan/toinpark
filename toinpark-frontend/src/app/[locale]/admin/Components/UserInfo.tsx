"use client";
import { useGetUserProfileQuery } from "@/store/api/user-profile/user-profile-api";
import Image from "next/image";
import React from "react";

export default function UserInfo() {
  const { data: user } = useGetUserProfileQuery();
  return (
    <div className="col-span-1 lg:col-span-2 2xl:col-span-1 flex items-center gap-4">
      <Image
        src="/images/all/admin-profile.png"
        alt="Admin"
        width={70}
        height={70}
        className="rounded-full"
      />
      <div>
        <p className="text-default-200 text-base">Good evening,</p>
        <h2 className="text-xl font-semibold text-default-100">
          {user?.data?.firstName} {user?.data?.lastName}
        </h2>
        <p className="text-default-200 text-base">Welcome to Dashboard</p>
      </div>
    </div>
  );
}
