import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { UseSidebarElements } from "./useSidebarElements";
import type { Content } from "pdfmake/interfaces";
import type { Profile } from "../../../../store/profile/interface";

export const useMobile = (
  renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
  renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
  const { t } = useTranslation();
	
  const mobile: Profile["mobile"] = useProfileStore(({ mobile }) => mobile);

  const renderMobile = useCallback((): Content => {
    if (_.isEmpty(mobile)) return [];
    return [
      renderSidebarCaption(t("personal-data.mobile")),
      renderSidebarTag(mobile),
    ];
  }, [t, renderSidebarCaption, renderSidebarTag, mobile]);

  return {  renderMobile };
};
