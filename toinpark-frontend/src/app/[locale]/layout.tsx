import { NextIntlClientProvider } from "next-intl";
import "@/styles/global.css";
import { getMessages } from "next-intl/server";
import MountedProvider from "@/providers/mounted.provider";
import { getSeoMeta } from "@/lib/getSeoMeta";
import { type TLayoutProps } from "@/lib/common.types";
import { fontInter } from "@/config/font";
import { Toaster as ReactHotToaster } from "react-hot-toast";
import ReduxStoreProvider from "@/store/ReduxStoreProvider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { SocketProvider } from "@/contexts/SocketContext";
export const metadata = getSeoMeta({ title: "Toinpark" });
export default async function RootLayout({ children, params }: TLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={` ${fontInter.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReduxStoreProvider>
          <SocketProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <MountedProvider>{children}</MountedProvider>
              <Toaster />
              <ReactHotToaster />
              <SonnerToaster />
            </NextIntlClientProvider>
          </SocketProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
