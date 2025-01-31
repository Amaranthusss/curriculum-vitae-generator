import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { UseSidebarElements } from "./useSidebarElements";
import type { Content } from "pdfmake/interfaces";
import type { Profile } from "../../../../store/profile/interface";

export const useLanguages = (
  renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
  renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
  const languages: Profile["languages"] = useProfileStore(
    ({ languages }) => languages
  );

  const renderLanguages = useCallback((): Content => {
    const tags: Content[] = [];

    _.forEach(languages, (language): void => {
      if (_.isEmpty(language)) return;
      if (_.isEmpty(language.text)) return;

      const levelDescription: string =
        !_.isNumber(language.level) || _.isNaN(language.level)
          ? ""
          : ` - ${language.level}`;

      tags.push(renderSidebarTag(language.text + levelDescription));
    });

    return [renderSidebarCaption("Languages"), ...tags];
  }, [renderSidebarCaption, renderSidebarTag, languages]);

  return { renderLanguages };
};
