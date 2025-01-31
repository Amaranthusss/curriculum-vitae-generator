import { useSidebarElements } from "./useSidebarElements.ts";
import { useBodyElements } from "./useBodyElements.ts";
import { useExperience } from "./useExperience.ts";
import { useNameLabel } from "./useFullName.ts";
import { useEducation } from "./useEducation.ts";
import { useLanguages } from "./useLanguages.ts";
import { useElements } from "./useElements.ts";
import { useCallback } from "react";
import { usePicture } from "./usePicture.ts";

import type { Content } from "pdfmake/interfaces";

import { layout, page, sidebar } from "../Preview.config.ts";

export const useIndex = () => {
  const { renderCaption, renderListItem } = useBodyElements();

  const { renderPicture } = usePicture();
  const { renderNameLabel } = useNameLabel();
  const { renderSidebarCaption, renderSidebarTag } = useSidebarElements();
  const { renderEducation } = useEducation(renderCaption, renderListItem);
  const { renderExperience } = useExperience(renderCaption, renderListItem);

  const { renderLanguages } = useLanguages(
    renderSidebarCaption,
    renderSidebarTag
  );

  const { renderEmail, renderCountry } = useElements(
    renderSidebarCaption,
    renderSidebarTag
  );

  const renderContent = useCallback((): Content => {
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
                ],
              },
              {
                stack: [
                  renderNameLabel(),
                  renderEducation(),
                  renderExperience(),
                ],
              },
            ],
          ],
        },
      },
    ];
  }, [
    renderEmail,
    renderCountry,
    renderPicture,
    renderEducation,
    renderNameLabel,
    renderLanguages,
    renderExperience,
  ]);

  return { renderContent };
};
