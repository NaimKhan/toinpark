"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/components/navigation";

const languages = [
  {
    code: "en",
    name: "EN",
    flag: "/images/flags/flag-1.png",
    label: "English",
  },
  {
    code: "fr",
    name: "FR",
    flag: "/images/flags/flag-2.jpg",
    label: "Français",
  },
  {
    code: "de",
    name: "DE",
    flag: "/images/flags/flag-3.jpg",
    label: "Deutsch",
  },
];

export default function Language() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextLocale: string) => {
    if (nextLocale === locale) {
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="!h-10 lg:!h-12 text-base bg-transparent border-border py-0 !px-4 xl:px-3 flex items-center gap-1"
          disabled={isPending}
        >
          {currentLanguage && (
            <>
              <Image
                src={currentLanguage.flag}
                alt={currentLanguage.label}
                width={24}
                height={24}
                className="rounded-full h-6 w-6"
              />
              <span>{currentLanguage.name}</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg shadow-lg mt-2 mr-6 lg:mr-16 p-0 flex flex-col border-none bg-gradient-to-b from-[#040706] to-[#0F1212]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className="!py-1.5 lg:!py-2 flex items-center gap-2 cursor-pointer"
          >
            <Image
              src={lang.flag}
              alt={lang.label}
              width={32}
              height={32}
              className="rounded-full h-8 w-8"
            />
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
