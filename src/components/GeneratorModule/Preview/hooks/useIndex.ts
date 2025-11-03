import { useAboutMeAtSidebar } from "./useAboutMeAtSidebar.ts";
import { useSidebarElements } from "./useSidebarElements.ts";
import { useQualifications } from "./useQualifications.ts";
import { useAboutMeAtPage } from "./useAboutMeAtPage.ts";
import { useBodyElements } from "./useBodyElements.ts";
import { usePublications } from "./usePublications.ts";
import { useReferences } from "./useReferences.ts";
import { useExperience } from "./useExperience.ts";
import { useInterests } from "./useInterests.ts";
import { useNameLabel } from "./useFullName.ts";
import { useEducation } from "./useEducation.ts";
import { useLanguages } from "./useLanguages.ts";
import { useCallback } from "react";
import { useCountry } from "./useCountry.ts";
import { usePicture } from "./usePicture.ts";
import { useFooter } from "./useFooter.ts";
import { useMobile } from "./useMobile.ts";
import { useEmail } from "./useEmail.ts";

import { useColorsStore } from "../../../../store/colors/useColorsStore.ts";

import type { Content } from "pdfmake/interfaces";

import { layout, page } from "../Preview.config.ts";

export const useIndex = () => {
	const sidebarBgColor: React.CSSProperties["color"] = useColorsStore(
		({ sidebarBgColor }) => sidebarBgColor
	);

	const { renderCaption, renderListItem, renderSubListItem } =
		useBodyElements();

	const { renderSidebarCaption, renderSidebarTag } = useSidebarElements();

	const { renderFooter } = useFooter();
	const { renderPicture } = usePicture();
	const { renderNameLabel } = useNameLabel();
	const { renderEducation } = useEducation(renderCaption, renderListItem);
	const { renderExperience } = useExperience(renderCaption, renderListItem);

	const { renderAboutMeAtPage } = useAboutMeAtPage(renderCaption);
	const { renderAboutMeAtSidebar } = useAboutMeAtSidebar(renderSidebarCaption, renderSidebarTag);

	const { renderPublications } = usePublications(
		renderCaption,
		renderListItem,
		renderSubListItem
	);

	const { renderQualifications } = useQualifications(
		renderCaption,
		renderListItem
	);

	const { renderLanguages } = useLanguages(
		renderSidebarCaption,
		renderSidebarTag
	);

	const { renderReferences } = useReferences(renderSidebarCaption, renderSidebarTag);
	const { renderInterests } = useInterests(renderSidebarCaption, renderSidebarTag);
	const { renderCountry } = useCountry(renderSidebarCaption, renderSidebarTag);
	const { renderMobile } = useMobile(renderSidebarCaption, renderSidebarTag);
	const { renderEmail } = useEmail(renderSidebarCaption, renderSidebarTag);

	const renderContent = useCallback(async (): Promise<Content> => {
		return [
			{
				table: {
					widths: [layout.drawerWidth, "*"],
					heights: page.a4Height,
					body: [
						[
							{
								text: "sidebar",
								fillColor: sidebarBgColor,
								border: [false, false, false, false],
								stack: [
									renderPicture(),
									renderEmail(),
									renderMobile(),
									renderCountry(),
									renderLanguages(),
									renderAboutMeAtSidebar(),
									await renderReferences(),
									renderInterests(),
								],
							},
							{
								stack: [
									renderNameLabel(),
									renderAboutMeAtPage(),
									renderEducation(),
									renderExperience(),
									renderQualifications(),
									renderPublications(),
									renderFooter(),
								],
							},
						],
					],
				},
			},
		];
	}, [
		sidebarBgColor,
		renderEmail,
		renderFooter,
		renderMobile,
		renderPicture,
		renderCountry,
		renderInterests,
		renderNameLabel,
		renderEducation,
		renderLanguages,
		renderReferences,
		renderExperience,
		renderPublications,
		renderAboutMeAtPage,
		renderQualifications,
		renderAboutMeAtSidebar,
	]);

	return { renderContent };
};
