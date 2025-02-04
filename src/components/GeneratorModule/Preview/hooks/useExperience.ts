import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { UseCommonElements } from "./useBodyElements";
import type { ExperienceField } from "../../../../store/profile/interface";
import type { Content } from "pdfmake/interfaces";
import dayjs from "dayjs";

export const useExperience = (
  renderCaption: UseCommonElements["renderCaption"],
  renderListItem: UseCommonElements["renderListItem"]
) => {
  const experience: ExperienceField[] = useProfileStore(
    ({ experience }) => experience
  );

  const renderExperience = useCallback((): Content => {
    return [
      renderCaption("Professional Experience"),
      ..._.map(
        experience,
        ({ text, startDate, endDate }: ExperienceField, index: number): Content => {
          const startDateFormatted: string | undefined =
            startDate == null ? undefined : dayjs(startDate).format("L");

          const endDateFormatted: string | undefined =
            endDate == null ? undefined : dayjs(endDate).format("L");

          return renderListItem(text, {
            startDate: startDateFormatted,
            endDate: endDateFormatted,
            disableLine: _.eq(index + 1, _.size(experience)),
          });
        }
      ),
    ];
  }, [experience, renderCaption, renderListItem]);

  return { renderExperience };
};
