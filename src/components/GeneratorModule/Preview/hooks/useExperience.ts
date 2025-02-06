import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import dayjs from "dayjs";
import _ from "lodash";

import type { UseCommonElements } from "./useBodyElements";
import type { ExperienceField } from "../../../../store/profile/interface";
import type { Content } from "pdfmake/interfaces";

import { TextMarker } from "../../../../constants/TextMarker";

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
        (experienceField: ExperienceField, index: number): Content => {
          if (
            _.isEmpty(experienceField?.workStation) &&
            _.isEmpty(experienceField?.date)
          ) {
            return [];
          }

          const { workStation, date, description } = experienceField;

          const startDateFormatted: string | undefined = _.isNil(date?.[0])
            ? undefined
            : dayjs(date[0]).format("L");

          const endDateFormatted: string | undefined = _.isNil(date?.[1])
            ? undefined
            : dayjs(date[1]).format("L");

          const text: string = _.join(
            [
              TextMarker.PrimaryBgColor,
              workStation,
              TextMarker.PrimaryBgColor,
              " ",
              description ?? "",
            ],
            ""
          );

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
