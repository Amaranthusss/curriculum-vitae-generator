import { useColorsStore } from "../../../../store/colors/useColorsStore";
import { useCallback } from "react";

import type { Content } from "pdfmake/interfaces";

import { sidebar } from "../Preview.config";

export const useSidebarElements = () => {
  const primaryBgColor: React.CSSProperties["color"] = useColorsStore(
    ({ primaryBgColor }) => primaryBgColor
  );

  const sidebarSidebarColor: React.CSSProperties["color"] = useColorsStore(
    ({ sidebarSidebarColor }) => sidebarSidebarColor
  );

  const sidebarSidebarCaptionColor: React.CSSProperties["color"] =
    useColorsStore(
      ({ sidebarSidebarCaptionColor }) => sidebarSidebarCaptionColor
    );

  const sidebarSidebarCaptionBgColor: React.CSSProperties["color"] =
    useColorsStore(
      ({ sidebarSidebarCaptionBgColor }) => sidebarSidebarCaptionBgColor
    );

  const renderSidebarCaption = useCallback(
    (text: string): Content => {
      return {
        table: {
          widths: [sidebar.caption.tagWidth, "*"],
          body: [
            [
              { text: "", fillColor: primaryBgColor },
              {
                text,
                fontSize: sidebar.caption.fontSize,
                fillColor: sidebarSidebarCaptionBgColor,
                color: sidebarSidebarCaptionColor,
              },
            ],
          ],
        },
        marginBottom: sidebar.caption.marginBottom,
        layout: "noBorders",
      };
    },
    [sidebarSidebarCaptionBgColor, sidebarSidebarCaptionColor, primaryBgColor]
  );

  const renderSidebarTag = useCallback(
    (text: string): Content => {
      return {
        table: {
          widths: [sidebar.caption.tagWidth, "*"],
          body: [
            [
              { text: "" },
              {
                text,
                fontSize: sidebar.tag.fontSize,
                color: sidebarSidebarColor,
                marginBottom: sidebar.tag.marginBottom,
              },
            ],
          ],
        },
        layout: "noBorders",
      };
    },
    [sidebarSidebarColor]
  );

  return { renderSidebarCaption, renderSidebarTag };
};

export type UseSidebarElements = ReturnType<typeof useSidebarElements>;
