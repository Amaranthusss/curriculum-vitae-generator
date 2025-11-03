import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { UseSidebarElements } from "./useSidebarElements";
import type { Content } from "pdfmake/interfaces";
import type { Profile } from "../../../../store/profile/interface";

export const useInterests = (
	renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
	renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
	const interestsAlignment: Profile["interestsAlignment"] = useProfileStore(({ interestsAlignment }) => interestsAlignment);
	const interests: Profile["interests"] = useProfileStore(({ interests }) => interests);
	const { t } = useTranslation();

	const renderInterests = useCallback((): Content => {
		if (_.isEmpty(interests) || _.isNil(interests)) return [];

		return [
			renderSidebarCaption(t("interests.caption")),
			renderSidebarTag(interests, { alignment: interestsAlignment }),
		];
	}, [t, renderSidebarCaption, renderSidebarTag, interests, interestsAlignment]);

	return { renderInterests };
};
