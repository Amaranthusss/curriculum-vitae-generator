import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import dayjs from "dayjs";
import _ from "lodash";

import type { UseCommonElements } from "./useBodyElements";
import type { ExperienceField } from "../../../../store/profile/interface";
import type { Content } from "pdfmake/interfaces";

export const useExperience = (
  renderCaption: UseCommonElements["renderCaption"],
  renderListItem: UseCommonElements["renderListItem"]
) => {
  const { t } = useTranslation();

  const experience: ExperienceField[] = useProfileStore(
    ({ experience }) => experience
  );

  const renderExperience = useCallback((): Content => {
    if (_.isEmpty(experience)) return [];

    return [
      renderCaption(t("experience.caption")),
      ..._.map(
        experience,
        (
          { text, startDate, endDate }: ExperienceField,
          index: number
        ): Content => {
          const startDateFormatted: string | undefined = _.isNil(startDate)
            ? undefined
            : dayjs(startDate).format("L");

          const endDateFormatted: string | undefined = _.isNil(endDate)
            ? undefined
            : dayjs(endDate).format("L");

          return renderListItem(text, {
            startDate: startDateFormatted,
            endDate: endDateFormatted,
            disableLine: _.eq(index + 1, _.size(experience)),
          });
        }
      ),
    ];
  }, [t, experience, renderCaption, renderListItem]);

  return { renderExperience };
};
