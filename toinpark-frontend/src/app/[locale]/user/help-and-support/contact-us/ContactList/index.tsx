"use client";

import { useGetSystemSettingsQuery } from "@/store/api/system-settings/system-settings-api";
import ContactUsCard from "./ContactUsCard";
import RenderData from "@/components/feature/loader/RenderData";

function ContactList() {
  const { data: getSystemSettingRes, ...getSystemSettingApiState } =
      useGetSystemSettingsQuery();
    const getSystemSettingData = getSystemSettingRes?.data;

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${getSystemSettingData?.whatsApp}?text=Hello`, "_blank")
  }

  const handleTelegram = () => {
    window.open(`https://t.me/${getSystemSettingData?.telegram}`, "_blank")
  }

  const handleEmail = () => {
    window.location.href = `mailto:${getSystemSettingData?.organizationEmail}`
  }
  return (
    <RenderData
      expectedDataType="object"
      data={getSystemSettingData}
      {...getSystemSettingApiState}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-5 md:pb-0">
        <ContactUsCard
          imageSrc="/images/socials/email.png"
          title={getSystemSettingData?.organizationEmail ?? "info@toichain.org"}
           onClick={handleEmail}
        />
        <ContactUsCard
          imageSrc="/images/socials/whatsapp-original.png"
          title="Join us on Whatsapp"
          onClick={handleWhatsApp}
        />
        <ContactUsCard
          imageSrc="/images/socials/telegram-original.png"
          title="Join us on Telegram"
          onClick={handleTelegram}
        />
      </div>
    </RenderData>
  );
}

export default ContactList;
