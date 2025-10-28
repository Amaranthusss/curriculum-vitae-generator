import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import { formatDate } from "../../../../utils/formatDate";
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

					const format: string = formatDate(date.displayLimit)

					const startDateFormatted: string | undefined =
						_.isArray(date.value) && !_.isNil(date.value?.[0])
							? dayjs(date.value[0]).format(format)
							: !_.isArray(date.value) && !_.isNil(date.value)
								? dayjs(date.value).format(format)
								: undefined;

					const endDateFormatted: string | undefined = date?.present
						? t("date-range-form-item.present")
						: _.isArray(date.value) && !_.isNil(date?.value?.[1])
							? dayjs(date.value[1]).format(format)
							: undefined;

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
