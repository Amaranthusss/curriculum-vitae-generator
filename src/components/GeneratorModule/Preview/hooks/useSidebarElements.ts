import { useColorsStore } from "../../../../store/colors/useColorsStore";
import { useCallback } from "react";

import type { Content, Size, TableCell } from "pdfmake/interfaces";

import { sidebar } from "../Preview.config";
import _ from "lodash";

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
    (text: string, icon?: string): Content => {
      const body: TableCell[] = [{ text: "", fillColor: primaryBgColor }];
      const widths: Size[] = [sidebar.caption.tagWidth];

      if (!_.isNil(icon) && !_.isEmpty(icon)) {
        body.push({
          svg: icon ?? "<svg></svg>",
          width: sidebar.caption.fontSize,
          height: sidebar.caption.fontSize,
          fillColor: sidebarSidebarCaptionBgColor,
        });
        widths.push(sidebar.caption.fontSize / 1.5);
      }

      body.push({
        text,
        fontSize: sidebar.caption.fontSize,
        fillColor: sidebarSidebarCaptionBgColor,
        color: sidebarSidebarCaptionColor,
      });
      widths.push("*");

      return {
        table: { widths, body: [body] },
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
