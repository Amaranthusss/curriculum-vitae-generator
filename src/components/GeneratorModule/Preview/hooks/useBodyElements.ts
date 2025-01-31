import { useCallback } from "react";

import type { Content, TableCell } from "pdfmake/interfaces";

import { caption, color, paragraph, splitter } from "../Preview.config";

const dateColumnWidth = 60;

export const useBodyElements = () => {
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
      }

      body.push({ text, ...paragraph, ...splitter, marginLeft: extra?.tab });

      return {
        table: { widths: [dateColumnWidth, "*"], body: [body] },
        layout: {
          hLineColor: extra?.disableLine ? "white" : color.secondary,
        },
      };
    },
    []
  );

  return { renderCaption, renderListItem };
};

export type UseCommonElements = ReturnType<typeof useBodyElements>;
