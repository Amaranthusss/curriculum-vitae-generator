import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { UseSidebarElements } from "./useSidebarElements";
import type { Content } from "pdfmake/interfaces";
import type { Profile } from "../../../../store/profile/interface";

export const useCountry = (
  renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
  renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
  const { t } = useTranslation();

  const country: Profile["country"] = useProfileStore(({ country }) => country);

  const renderCountry = useCallback((): Content => {
    if (_.isEmpty(country)) return [];
    return [
      renderSidebarCaption(t("personal-data.country")),
      renderSidebarTag(country),
    ];
  }, [t, renderSidebarCaption, renderSidebarTag, country]);

  return { renderCountry };
};
