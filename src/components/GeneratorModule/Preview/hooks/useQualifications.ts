import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import { formatDate } from "../../../../utils/formatDate";
import dayjs from "dayjs";
import _ from "lodash";

import type { QualificationField } from "../../../../store/profile/interface";
import type { UseCommonElements } from "./useBodyElements";
import type { Content } from "pdfmake/interfaces";

import { TextMarker } from "../../../../constants/TextMarker";

export const useQualifications = (
  renderCaption: UseCommonElements["renderCaption"],
  renderListItem: UseCommonElements["renderListItem"]
) => {
  const { t } = useTranslation();

  const qualifications: QualificationField[] = useProfileStore(
    ({ qualifications }) => qualifications
  );

  const renderQualifications = useCallback((): Content => {
    if (_.isEmpty(qualifications)) return [];

    return [
      renderCaption(t("qualifications.caption")),
      ..._.map(
        qualifications,
        (qualificationField: QualificationField, index: number): Content => {
          if (_.isEmpty(qualificationField?.name)) return [];

          const { name, type, description, issueDate, issueDateDisplayLimit } = qualificationField;

					const format: string = formatDate(issueDateDisplayLimit)

          const formatted: string | undefined =
            issueDate == null ? undefined : dayjs(issueDate).format(format);

          const text: string = _.chain([
            type,
            _.join(
              [TextMarker.PrimaryBgColor, name, TextMarker.PrimaryBgColor],
              ""
            ),
            description,
          ])
            .filter((text: string | undefined) => !_.isEmpty(text))
            .join(" ")
            .value();

          return renderListItem(text, {
            endDate: formatted,
            disableLine: _.eq(index + 1, _.size(qualifications)),
          });
        }
      ),
    ];
  }, [t, qualifications, renderCaption, renderListItem]);

  return { renderQualifications };
};
