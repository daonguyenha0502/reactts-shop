//https://github.com/benawad/dogehouse/blob/staging/kofta/src/app/utils/useTypeSafeTranslation.ts
import { useTranslation } from "react-i18next";
import type { TranslationKeys } from "../generated/translationKeys";


export const useTypeSafeTranslation = () => {
    const { t } = useTranslation();

    return {
        t: (s: TranslationKeys) => t(s),
    };
};