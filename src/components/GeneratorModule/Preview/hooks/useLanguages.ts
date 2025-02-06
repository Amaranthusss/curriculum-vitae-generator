import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { UseSidebarElements } from "./useSidebarElements";
import type { LanguageField } from "../../../../store/profile/interface";
import type { Content } from "pdfmake/interfaces";

export const useLanguages = (
  renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
  renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
  const { t } = useTranslation();

  const languages: LanguageField[] = useProfileStore(
    ({ languages }) => languages
  );

  const renderLanguages = useCallback((): Content => {
    if (_.isEmpty(languages)) return [];

    const tags: Content[] = [];

    _.forEach(languages, (language: LanguageField): void => {
      if (_.isEmpty(language)) return;
      if (_.isEmpty(language.text)) return;

      const levelDescription: string =
        !_.isNumber(language.level) || _.isNaN(language.level)
          ? ""
          : ` - ${language.level}`;

      tags.push(renderSidebarTag(language.text + levelDescription));
    });

    return [renderSidebarCaption(t("languages.caption")), ...tags];
  }, [t, renderSidebarCaption, renderSidebarTag, languages]);

  return { renderLanguages };
};
