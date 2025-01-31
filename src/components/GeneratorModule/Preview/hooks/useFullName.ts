import { useCallback } from "react";

import { useColorsStore } from "../../../../store/colors/useColorsStore";
import { useFormStore } from "../../../../store/form/useFormStore";

import type { JoinNameAndSurname } from "../../../../store/form/interface";
import type { Content } from "pdfmake/interfaces";

import { padding } from "../Preview.config";

export const useNameLabel = () => {
  const joinNameAndSurname: JoinNameAndSurname = useFormStore(
    ({ joinNameAndSurname }) => joinNameAndSurname
  );

  const primaryColor: React.CSSProperties["color"] = useColorsStore(
    ({ primaryColor }) => primaryColor
  );

  const primaryBgColor: React.CSSProperties["color"] = useColorsStore(
    ({ primaryBgColor }) => primaryBgColor
  );

  const renderNameLabel = useCallback((): Content[] => {
    return [
      {
        table: {
          widths: ["*"],
          heights: [padding.top],
          body: [[]],
        },
        layout: "noBorders",
      },
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: joinNameAndSurname() ?? "John Doe",
                style: [{ fontFeatures: ["c2sc", "smcp"] }],
                fillColor: primaryBgColor,
                color: primaryColor,
                fontSize: 32,
                margin: [padding.inline, padding.block, 0, padding.block],
              },
            ],
          ],
        },
        marginBottom: padding.top,
        layout: "noBorders",
      },
    ];
  }, [joinNameAndSurname, primaryColor, primaryBgColor]);

  return { renderNameLabel };
};
