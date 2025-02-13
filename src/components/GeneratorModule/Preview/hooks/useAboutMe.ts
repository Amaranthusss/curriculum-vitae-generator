import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { UseSidebarElements } from "./useSidebarElements";
import type { Content } from "pdfmake/interfaces";
import type { Profile } from "../../../../store/profile/interface";

export const useAboutMe = (
  renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
  renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
  const { t } = useTranslation();

  const aboutMe: Profile["aboutMe"] = useProfileStore(({ aboutMe }) => aboutMe);

  const renderAboutMe = useCallback((): Content => {
    if (_.isEmpty(aboutMe) || _.isNil(aboutMe)) return [];
    return [
      renderSidebarCaption(t("personal-data.about-me")),
      renderSidebarTag(aboutMe),
    ];
  }, [t, renderSidebarCaption, renderSidebarTag, aboutMe]);

  return { renderAboutMe };
};
