import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import dayjs from "dayjs";
import _ from "lodash";

import type { UseCommonElements } from "./useBodyElements";
import type { EducationField } from "../../../../store/profile/interface";
import type { Content } from "pdfmake/interfaces";

import { TextMarker } from "../../../../constants/TextMarker";

export const useEducation = (
  renderCaption: UseCommonElements["renderCaption"],
  renderListItem: UseCommonElements["renderListItem"]
) => {
  const { t } = useTranslation();

  const education: EducationField[] = useProfileStore(
    ({ education }) => education
  );

  const renderEducation = useCallback((): Content => {
    if (_.isEmpty(education)) return [];

    return [
      renderCaption(t("education.caption")),
      ..._.map(
        education,
        (educationField: EducationField, index: number): Content => {
          if (
            _.isEmpty(educationField?.title) &&
            _.isEmpty(educationField?.date)
          ) {
            return [];
          }

          const { title, description, date } = educationField;

          const startDateFormatted: string | undefined = _.isNil(date?.[0])
            ? undefined
            : dayjs(date[0]).format("L");

          const endDateFormatted: string | undefined = _.isNil(date?.[1])
            ? undefined
            : dayjs(date[1]).format("L");

          const text: string = _.join(
            [
              TextMarker.PrimaryBgColor,
              title,
              TextMarker.PrimaryBgColor,
              " ",
              description ?? "",
            ],
            ""
          );

          return renderListItem(text, {
            startDate: startDateFormatted,
            endDate: endDateFormatted,
            disableLine: _.eq(index + 1, _.size(education)),
          });
        }
      ),
    ];
  }, [t, education, renderCaption, renderListItem]);

  return { renderEducation };
};
