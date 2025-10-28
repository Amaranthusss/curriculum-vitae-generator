import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import { formatDate } from "../../../../utils/formatDate";
import dayjs from "dayjs";
import _ from "lodash";

import type { GeneralSettings, PublicationField } from "../../../../store/profile/interface";
import type { UseCommonElements } from "./useBodyElements";
import type { Content } from "pdfmake/interfaces";

export const usePublications = (
	renderCaption: UseCommonElements["renderCaption"],
	renderListItem: UseCommonElements["renderListItem"],
	renderSubListItem: UseCommonElements["renderSubListItem"]
) => {
	const generalSettings: GeneralSettings = useProfileStore(({ generalSettings }) => generalSettings);
	const publications: PublicationField[] = useProfileStore(({ publications }) => publications);
	const { t } = useTranslation();

	const renderPublications = useCallback((): Content => {
		if (_.isEmpty(publications)) return [];

		return [
			renderCaption(t("publications.caption")),
			..._.map(publications, (publicationField: PublicationField): Content => {
				if (_.isEmpty(publicationField?.title)) return [];

				const { title, publisher, code, date } = publicationField;

				const format: string = formatDate(date.displayLimit ?? generalSettings.publications.dateDisplayLimit);

				const publisherText: string = !_.isEmpty(publisher)
					? ` - ${publisher}`
					: "";

				const publicationYearText: string = !_.isNil(date.value) && !_.isArray(date.value)
					? `, ${dayjs(date.value).format(format)}`
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
	}, [t, publications, generalSettings.publications.dateDisplayLimit, renderCaption, renderListItem, renderSubListItem]);

	return { renderPublications };
};
