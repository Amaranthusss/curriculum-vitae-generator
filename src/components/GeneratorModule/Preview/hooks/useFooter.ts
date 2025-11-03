import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { Content } from "pdfmake/interfaces";
import type { Profile } from "../../../../store/profile/interface";

export const useFooter = () => {
	const footerAlignment: Profile["footerAlignment"] = useProfileStore(({ footerAlignment }) => footerAlignment);
	const footerTopMargin: Profile["footerTopMargin"] = useProfileStore(({ footerTopMargin }) => footerTopMargin);
	const footer: Profile["footer"] = useProfileStore(({ footer }) => footer);

	const renderFooter = useCallback((): Content => {
		if (_.isEmpty(footer) || _.isNil(footer)) return [];

		return [
			{
				text: footer,
				color: 'gray',
				fontSize: 8,
				marginLeft: 5,
				marginRight: 5,
				marginTop: footerTopMargin,
				alignment: footerAlignment,
			}
		];
	}, [footer, footerAlignment, footerTopMargin]);

	return { renderFooter };
};
