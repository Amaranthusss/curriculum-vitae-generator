import { useSidebarElements } from "./useSidebarElements.ts";
import { useQualifications } from "./useQualifications.ts";
import { useBodyElements } from "./useBodyElements.ts";
import { usePublications } from "./usePublications.ts";
import { useExperience } from "./useExperience.ts";
import { useNameLabel } from "./useFullName.ts";
import { useEducation } from "./useEducation.ts";
import { useLanguages } from "./useLanguages.ts";
import { useCountry } from "./useCountry.ts";
import { useCallback } from "react";
import { useAboutMe } from "./useAboutMe.ts";
import { usePicture } from "./usePicture.ts";
import { useMobile } from "./useMobile.ts";
import { useLinks } from "./useLinks.ts";
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

	const { renderPicture } = usePicture();
	const { renderNameLabel } = useNameLabel();
	const { renderEducation } = useEducation(renderCaption, renderListItem);
	const { renderExperience } = useExperience(renderCaption, renderListItem);
	const { renderAboutMe } = useAboutMe(renderSidebarCaption, renderSidebarTag);

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

	const { renderCountry } = useCountry(renderSidebarCaption, renderSidebarTag);
	const { renderMobile } = useMobile(renderSidebarCaption, renderSidebarTag);
	const { renderEmail } = useEmail(renderSidebarCaption, renderSidebarTag);
	const { renderLinks } = useLinks(renderSidebarCaption, renderSidebarTag);

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
									renderAboutMe(),
									await renderLinks(),
								],
							},
							{
								stack: [
									renderNameLabel(),
									renderEducation(),
									renderExperience(),
									renderQualifications(),
									renderPublications(),
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
		renderLinks,
		renderMobile,
		renderAboutMe,
		renderPicture,
		renderCountry,
		renderEducation,
		renderNameLabel,
		renderLanguages,
		renderExperience,
		renderPublications,
		renderQualifications,
	]);

	return { renderContent };
};
