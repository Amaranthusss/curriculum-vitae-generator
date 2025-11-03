import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import _ from "lodash";

import type { Content } from "pdfmake/interfaces";
import type { Profile } from "../../../../store/profile/interface";

export const useFooter = () => {
	const footerAlignment: Profile["footerAlignment"] = useProfileStore(({ footerAlignment }) => footerAlignment);
	const footer: Profile["footer"] = useProfileStore(({ footer }) => footer);

	const renderFooter = useCallback((): Content => {
		if (_.isEmpty(footer) || _.isNil(footer)) return [];

		return [
			{
				color: 'gray',
				fontSize: 8,
				marginTop: 4,
				marginLeft: 5,
				marginRight: 5,
				text: footer,
				alignment: footerAlignment,
			}
		];
	}, [footer, footerAlignment]);

	return { renderFooter };
};
