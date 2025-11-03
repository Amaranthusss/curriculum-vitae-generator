import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { UseSidebarElements } from "./useSidebarElements";
import type { Content } from "pdfmake/interfaces";
import type { Profile } from "../../../../store/profile/interface";

export const useAboutMeAtSidebar = (
	renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
	renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
	const aboutMeAlignment: Profile["aboutMeAlignment"] = useProfileStore(({ aboutMeAlignment }) => aboutMeAlignment);
	const isAboutMeAtPage: Profile["isAboutMeAtPage"] = useProfileStore(({ isAboutMeAtPage }) => isAboutMeAtPage);
	const aboutMe: Profile["aboutMe"] = useProfileStore(({ aboutMe }) => aboutMe);
	const { t } = useTranslation();

	const renderAboutMeAtSidebar = useCallback((): Content => {
		if (isAboutMeAtPage) return [];
		if (_.isEmpty(aboutMe) || _.isNil(aboutMe)) return [];

		return [
			renderSidebarCaption(t("personal-data.about-me")),
			renderSidebarTag(aboutMe, { alignment: aboutMeAlignment }),
		];
	}, [t, renderSidebarCaption, renderSidebarTag, aboutMe, aboutMeAlignment, isAboutMeAtPage]);

	return { renderAboutMeAtSidebar };
};
