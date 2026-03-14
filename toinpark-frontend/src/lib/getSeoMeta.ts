import type { Metadata } from "next";

type TGetSeoMetaProps = Metadata | void;

export const getSeoMeta = (props: TGetSeoMetaProps): Metadata => {
  const {
    title,
    applicationName = "Toinpark Dashboard",
    description = "Created by Toinpark",
    manifest = "/images/fav-icon/site.webmanifest",
    icons = {
      icon: "/images/logo/app-logo-2.png",
      apple: "/images/logo/app-logo-2.png",
    },
    ...restProps
  } = props || {};
  const finalTitle = title ? `${title} | Toinpark Dashboard` : "Toinpark Dashboard";

  return {
    title: finalTitle,
    applicationName,
    description,
    icons,
    manifest,
    ...restProps,
  };
};