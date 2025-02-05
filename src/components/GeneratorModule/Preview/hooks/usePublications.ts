import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import dayjs from "dayjs";
import _ from "lodash";

import type { UseCommonElements } from "./useBodyElements";
import type { PublicationField } from "../../../../store/profile/interface";
import type { Content } from "pdfmake/interfaces";

export const usePublications = (
  renderCaption: UseCommonElements["renderCaption"],
  renderListItem: UseCommonElements["renderListItem"],
  renderSubListItem: UseCommonElements["renderSubListItem"]
) => {
  const publications: PublicationField[] = useProfileStore(
    ({ publications }) => publications
  );

  const renderPublications = useCallback((): Content => {
    if (_.isEmpty(publications)) return [];

    return [
      renderCaption("Research Publications"),
      ..._.map(publications, (publicationField: PublicationField): Content => {
        if (_.isEmpty(publicationField?.title)) return [];

        const { title, publisher, code, publicationYear } = publicationField;

        const publisherText: string = !_.isEmpty(publisher)
          ? ` - ${publisher}`
          : "";

        const publicationYearText: string = !_.isNil(publicationYear)
          ? `, ${dayjs(publicationYear).format("YYYY")}`
          : "";

        const text: string = `- ${title}${publisherText}${publicationYearText}`;

        const codeContent: Content = [renderSubListItem(code)];

        if (!_.isEmpty(code)) {
          codeContent.push();
        }

        return [
          renderListItem(text, {
            disableLine: true,
            disableMarginBottom: true,
          }),
          ...codeContent,
        ];
      }),
    ];
  }, [publications, renderCaption, renderListItem, renderSubListItem]);

  return { renderPublications };
};
