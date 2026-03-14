import { useLocale } from "next-intl";
function useDefaultLocale(): string {
    const locale = useLocale();
    return locale;
}

export default useDefaultLocale;
