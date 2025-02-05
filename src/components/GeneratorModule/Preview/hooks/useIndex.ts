import { useSidebarElements } from "./useSidebarElements.ts";
import { useQualifications } from "./useQualifications.ts";
import { useBodyElements } from "./useBodyElements.ts";
import { useExperience } from "./useExperience.ts";
import { useNameLabel } from "./useFullName.ts";
import { useEducation } from "./useEducation.ts";
import { useLanguages } from "./useLanguages.ts";
import { useElements } from "./useElements.ts";
import { useCallback } from "react";
import { useAboutMe } from "./useAboutMe.ts";
import { usePicture } from "./usePicture.ts";
import { useLinks } from "./useLinks.ts";

import type { Content } from "pdfmake/interfaces";

import { layout, page, sidebar } from "../Preview.config.ts";

export const useIndex = () => {
  const { renderCaption, renderListItem } = useBodyElements();

  const { renderPicture } = usePicture();
  const { renderNameLabel } = useNameLabel();
  const { renderSidebarCaption, renderSidebarTag } = useSidebarElements();
  const { renderEducation } = useEducation(renderCaption, renderListItem);
  const { renderExperience } = useExperience(renderCaption, renderListItem);
  const { renderAboutMe } = useAboutMe(renderSidebarCaption, renderSidebarTag);

  const { renderQualifications } = useQualifications(
    renderCaption,
    renderListItem
  );

  const { renderLanguages } = useLanguages(
    renderSidebarCaption,
    renderSidebarTag
  );

  const { renderLinks } = useLinks(renderSidebarCaption, renderSidebarTag);

  const { renderEmail, renderCountry } = useElements(
    renderSidebarCaption,
    renderSidebarTag
  );

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
                fillColor: sidebar.bgColor,
                border: [false, false, false, false],
                stack: [
                  renderPicture(),
                  renderEmail(),
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
                ],
              },
            ],
          ],
        },
      },
    ];
  }, [
    renderEmail,
    renderLinks,
    renderAboutMe,
    renderPicture,
    renderCountry,
    renderEducation,
    renderNameLabel,
    renderLanguages,
    renderExperience,
    renderQualifications,
  ]);

  return { renderContent };
};
