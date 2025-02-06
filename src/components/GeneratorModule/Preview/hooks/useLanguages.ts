import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";
import { useColorsStore } from "../../../../store/colors/useColorsStore";

import _ from "lodash";

import type { UseSidebarElements } from "./useSidebarElements";
import type { LanguageField } from "../../../../store/profile/interface";
import type { Content } from "pdfmake/interfaces";

export const useLanguages = (
  renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
  renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
  const { t } = useTranslation();

  const secondaryColor: React.CSSProperties["color"] = useColorsStore(
    ({ secondaryColor }) => secondaryColor
  );

  const languages: LanguageField[] = useProfileStore(
    ({ languages }) => languages
  );

  const translateLanguageLevel = useCallback(
    (level: number): string => {
      switch (level) {
        case 1:
          return t("languages.a1");
        case 2:
          return t("languages.a2");
        case 3:
          return t("languages.b1");
        case 4:
          return t("languages.b2");
        case 5:
          return t("languages.c1");
        case 6:
          return t("languages.c2");
        case 7:
          return t("languages.native");
        default:
          return "";
      }
    },
    [t]
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
          : translateLanguageLevel(language.level);

      tags.push(
        renderSidebarTag("- " + language.text, { disableMarginBottom: true })
      );

      tags.push(
        renderSidebarTag(levelDescription, { textColor: secondaryColor })
      );
    });

    return [renderSidebarCaption(t("languages.caption")), ...tags];
  }, [
    t,
    languages,
    secondaryColor,
    renderSidebarTag,
    renderSidebarCaption,
    translateLanguageLevel,
  ]);

  return { renderLanguages };
};
