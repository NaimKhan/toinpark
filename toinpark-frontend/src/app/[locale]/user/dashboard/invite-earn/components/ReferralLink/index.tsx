"use client";

import CopyButton from "@/components/feature/buttons/CopyButton";
import GradientText from "@/components/feature/text/gradientText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetReferralLinkQuery,
  useLazyGetSendEmailInvitationQuery,
} from "@/store/api/user-dashboard/user-dashboard-api";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getApiMessage } from "@/lib/errors/getFieldErrors";

function ReferralLink({ siteLink }: { siteLink?: string }) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const locale = useLocale();


  const { data: referralLinkRes } = useGetReferralLinkQuery();

  const referralLinkData = referralLinkRes?.data;

  const referralLink = referralLinkData
    ? `${siteLink}/${locale}/auth/register?referral=${referralLinkData}`
    : "";

  const [triggerSendInvite] = useLazyGetSendEmailInvitationQuery();

  const handleSendInvite = async () => {
    if (!email)
      return toast({
        title: "Please enter an email",
        variant: "error",
      });

    const toastId = toast({
      variant: "loading",
      title: "Loading...",
      description: "Please wait while we send the invitation",
    });

    try {
      const res = await triggerSendInvite({ emailId: email }).unwrap();

      toastId.update({
        id: toastId.id,
        variant: "success",
        title: "Success",
        description: res?.message || "Invite sent successfully!",
      });

      setEmail("");
    } catch (error) {
      toastId.update({
        id: toastId.id,
        variant: "error",
        title: getApiMessage(error) || "Failed to send email invitation",
        description: "Please try again.",
      });
    }
  };


  return (
    <div className="w-full space-y-6 md:space-y-10 md:border-b-0 border-b px-6 py-6 xl:px-16 md:px-10 md:py-12">
      <div>
        <GradientText
          label="Invite & Earn"
          className="text-[28px] md:text-[34px] lg:text-[40px] font-medium"
        />
        <p className="text-lg text-default-200">
          Invite friends using your referral link and grow your network.
        </p>
        <p className="text-lg text-default-200">
          Earn bonus coins every time your referrals join and stake.
        </p>
      </div>
      <div className="space-y-6 md:space-y-10">
        <div className="space-y-4">
          <h5 className="text-lg">Referral Link</h5>
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              value={referralLink}
              readOnly
              className="bg-background text-default-200"
            />
            <CopyButton text={referralLink}>Copy Link</CopyButton>
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            <Button
              size="default"
              className="rounded-sm bg-whatsapp hover:bg-whatsapp/90 text-default-100"
            >
              <Image
                src="/images/socials/whatsapp.png"
                alt="WhatsApp"
                width={20}
                height={20}
              />
            </Button>

            <Button
              size="default"
              className="rounded-sm bg-telegram hover:bg-telegram/90 text-default-100"
            >
              <Image
                src="/images/socials/telegram.png"
                alt="Telegram"
                width={20}
                height={20}
              />
            </Button>

            <Button
              size="default"
              className="rounded-sm bg-messenger hover:bg-messenger/90 text-default-100"
            >
              <Image
                src="/images/socials/messenger.png"
                alt="Messenger"
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>

        {/* Invite by Email */}
        <div className="space-y-4">
          <h5 className="text-lg">Invite by Email</h5>
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background text-default-200"
            />
            <Button
              variant="default"
              size="lg"
              color="default"
              className=" text-default-900"
              onClick={handleSendInvite}
            >
              Send Invite
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralLink;
