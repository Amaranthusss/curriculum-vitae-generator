import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { UseCommonElements } from "./useBodyElements";
import type { Content } from "pdfmake/interfaces";
import type { Profile } from "../../../../store/profile/interface";

import { paragraph } from "../Preview.config";

export const useAboutMeAtPage = (
	renderCaption: UseCommonElements["renderCaption"],
) => {
	const aboutMeAlignment: Profile["aboutMeAlignment"] = useProfileStore(({ aboutMeAlignment }) => aboutMeAlignment);
	const isAboutMeAtPage: Profile["isAboutMeAtPage"] = useProfileStore(({ isAboutMeAtPage }) => isAboutMeAtPage);
	const aboutMe: Profile["aboutMe"] = useProfileStore(({ aboutMe }) => aboutMe);
	const { t } = useTranslation();

	const renderAboutMeAtPage = useCallback((): Content => {
		if (!isAboutMeAtPage) return [];
		if (_.isEmpty(aboutMe) || _.isNil(aboutMe)) return [];

		return [
			renderCaption(t("personal-data.about-me")),
			{
				...paragraph,
				marginTop: 4,
				marginLeft: 5,
				marginRight: 5,
				alignment: aboutMeAlignment,
				text: aboutMe
			}
		];
	}, [t, renderCaption, aboutMe, aboutMeAlignment, isAboutMeAtPage]);

	return { renderAboutMeAtPage };
};
