import { useCallback } from "react";

import { useColorsStore } from "../../../../store/colors/useColorsStore";

import type { Content, Size, TableCell } from "pdfmake/interfaces";

import { caption, color, paragraph, splitter } from "../Preview.config";
import { TextMarker } from "../../../../constants/TextMarker";

const dateColumnWidth = 60;

export const useBodyElements = () => {
  const primaryBgColor: React.CSSProperties["color"] = useColorsStore(
    ({ primaryBgColor }) => primaryBgColor
  );

  const renderCaption = useCallback((text: string): Content => {
    return {
      table: {
        widths: ["*"],
        body: [[{ text, ...caption }]],
      },
    };
  }, []);

  const renderListItem = useCallback(
    (
      text: string,
      extra?: {
        startDate?: string;
        endDate?: string;
        tab?: number;
        disableLine?: boolean;
      }
    ): Content => {
      const body: TableCell[] = [];
      const widths: Size[] = [];

      if (extra?.startDate != null || extra?.endDate != null) {
        const jointText: string | null =
          extra?.startDate != null && extra?.endDate
            ? `${extra?.startDate}\n${extra?.endDate}`
            : null;

        body.push({
          text: jointText ?? extra?.endDate ?? extra?.startDate,
          ...paragraph,
          ...splitter,
        });

        widths.push(dateColumnWidth);
      }

      const parseColoredText = (text: string): Content[] => {
        const regex: RegExp = new RegExp(
          `${TextMarker.PrimaryBgColor}(.*?)${TextMarker.PrimaryBgColor}`,
          "g"
        );

        const parts: Content[] = [];
        let lastIndex = 0;

        text.replace(regex, (match, group, index) => {
          if (index > lastIndex) {
            parts.push({ text: text.substring(lastIndex, index) });
          }

          parts.push({ text: group, color: primaryBgColor });

          lastIndex = index + match.length;
          return match;
        });

        if (lastIndex < text.length) {
          parts.push({ text: text.substring(lastIndex) });
        }

        return parts.length > 0 ? parts : [{ text }];
      };

      body.push({
        text: parseColoredText(text),
        ...paragraph,
        ...splitter,
        marginLeft: extra?.tab,
      });

      widths.push("*");

      return {
        table: { widths, body: [body] },
        layout: {
          hLineColor: extra?.disableLine ? "white" : color.secondary,
        },
      };
    },
    [primaryBgColor]
  );

  return { renderCaption, renderListItem };
};

export type UseCommonElements = ReturnType<typeof useBodyElements>;
