import { useCallback } from "react";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import { fetchIcon } from "../../../../utils/fetchIcon";
import _ from "lodash";

import type { UseSidebarElements } from "./useSidebarElements";
import type { ReferenceField } from "../../../../store/profile/interface";
import type { Content } from "pdfmake/interfaces";

export const useReferences = (
	renderSidebarCaption: UseSidebarElements["renderSidebarCaption"],
	renderSidebarTag: UseSidebarElements["renderSidebarTag"]
) => {
	const links: ReferenceField[] = useProfileStore(({ references: links }) => links);

	const renderReferences = useCallback(async (): Promise<Content> => {
		const tags: Content[] = [];

		for (const link of links) {
			if (_.isEmpty(link)) continue;
			if (_.isEmpty(link.link)) continue;
			if (_.isEmpty(link.label)) continue;

			const iconBase64: string = await fetchIcon(link.icon);

			tags.push(renderSidebarCaption(link.label, iconBase64));
			tags.push(renderSidebarTag(link.link));
		}

		return tags;
	}, [renderSidebarCaption, renderSidebarTag, links]);

	return { renderReferences };
};
