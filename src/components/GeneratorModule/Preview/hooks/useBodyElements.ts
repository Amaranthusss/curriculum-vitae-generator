import { useCallback } from "react";

import { useColorsStore } from "../../../../store/colors/useColorsStore";

import _ from "lodash";

import type { Content, Size, TableCell } from "pdfmake/interfaces";

import { subParagraph } from "../Preview.config";
import { TextMarker } from "../../../../constants/TextMarker";
import { paragraph } from "../Preview.config";
import { splitter } from "../Preview.config";
import { caption } from "../Preview.config";
import { color } from "../Preview.config";

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

  const parseColoredText = useCallback(
    (text: string | undefined): Content[] => {
      if (_.isNil(text) || _.isEmpty(text)) return [];

      const parts: Content[] = [];
      const regex: RegExp = new RegExp(
        `${TextMarker.PrimaryBgColor}(.*?)${TextMarker.PrimaryBgColor}`,
        "g"
      );

      let lastIndex: number = 0;

      text.replace(
        regex,
        (match: string, group: Content, index: number): string => {
          if (index > lastIndex) {
            parts.push({ text: text.substring(lastIndex, index) });
          }

          parts.push({ text: group, color: primaryBgColor });
          lastIndex = index + match.length;

          return match;
        }
      );

      if (lastIndex < text.length) {
        parts.push({ text: text.substring(lastIndex) });
      }

      return parts.length > 0 ? parts : [{ text }];
    },
    [primaryBgColor]
  );

  const renderListItem = useCallback(
    (
      text: string,
      extra?: {
        startDate?: string;
        endDate?: string;
        tab?: number;
        disableLine?: boolean;
        disableMarginBottom?: boolean;
      }
    ): Content => {
      const body: TableCell[] = [];
      const widths: Size[] = [];

      const overwrittenStyles: TableCell = {
        ...paragraph,
        marginBottom: extra?.disableMarginBottom ? 0 : paragraph.marginBottom,
        marginLeft: extra?.tab,
      };

      if (extra?.startDate != null || extra?.endDate != null) {
        const jointText: string | null =
          extra?.startDate != null && extra?.endDate
            ? `${extra?.startDate}\n${extra?.endDate}`
            : null;

        body.push({
          text: jointText ?? extra?.endDate ?? extra?.startDate,
          ...paragraph,
          ...splitter,
          ...overwrittenStyles,
        });

        widths.push(dateColumnWidth);
      }

      body.push({
        text: parseColoredText(text),
        ...paragraph,
        ...splitter,
        ...overwrittenStyles,
      });

      widths.push("*");

      return {
        table: { widths, body: [body] },
        layout: {
          hLineColor: extra?.disableLine ? "white" : color.secondary,
        },
      };
    },
    [parseColoredText]
  );

  const renderSubListItem = useCallback((text: string): Content => {
    return {
      table: { widths: ["*"], body: [[{ text, ...subParagraph }]] },
      layout: "noBorders",
    };
  }, []);

  return { renderCaption, renderListItem, renderSubListItem };
};

export type UseCommonElements = ReturnType<typeof useBodyElements>;
