import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { UseCommonElements } from "./useBodyElements";
import type { Education } from "../../../../store/profile/interface";
import type { Content } from "pdfmake/interfaces";
import dayjs from "dayjs";

export const useEducation = (
  renderCaption: UseCommonElements["renderCaption"],
  renderListItem: UseCommonElements["renderListItem"]
) => {
  const education: Education[] = useProfileStore(({ education }) => education);

  const renderEducation = useCallback((): Content => {
    return [
      renderCaption("Education"),
      ..._.map(
        education,
        ({ text, startDate, endDate }: Education, index: number): Content => {
          const startDateFormatted: string | undefined =
            startDate == null ? undefined : dayjs(startDate).format("L");

          const endDateFormatted: string | undefined =
            endDate == null ? undefined : dayjs(endDate).format("L");

          return renderListItem(text, {
            startDate: startDateFormatted,
            endDate: endDateFormatted,
            disableLine: _.eq(index + 1, _.size(education)),
          });
        }
      ),
    ];
  }, [education, renderCaption, renderListItem]);

  return { renderEducation };
};
