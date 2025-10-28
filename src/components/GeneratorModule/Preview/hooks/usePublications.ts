import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import { formatDate } from "../../../../utils/formatDate";
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
  const { t } = useTranslation();

  const publications: PublicationField[] = useProfileStore(
    ({ publications }) => publications
  );

  const renderPublications = useCallback((): Content => {
    if (_.isEmpty(publications)) return [];

    return [
      renderCaption(t("publications.caption")),
      ..._.map(publications, (publicationField: PublicationField): Content => {
        if (_.isEmpty(publicationField?.title)) return [];

        const { title, publisher, code, publicationYear, publicationYearDisplayLimit } = publicationField;

				const format: string = formatDate(publicationYearDisplayLimit)

        const publisherText: string = !_.isEmpty(publisher)
          ? ` - ${publisher}`
          : "";

        const publicationYearText: string = !_.isNil(publicationYear)
          ? `, ${dayjs(publicationYear).format(format)}`
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
  }, [t, publications, renderCaption, renderListItem, renderSubListItem]);

  return { renderPublications };
};
