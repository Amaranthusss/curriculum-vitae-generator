import { ColorPicker, Form, Tooltip } from "antd";

import { useTranslation } from "react-i18next";
import { useCallback } from "react";

import _ from "lodash";

import type { PickersProps } from "./Pickers.interface";
import type { Colors } from "../../../../store/colors/interface";
import type { Color } from "antd/es/color-picker";

export const Pickers = ({ initialValues }: PickersProps): React.ReactNode => {
  const { t } = useTranslation();

  const getColorPickerLabel = useCallback(
    (param: keyof Colors): string | undefined => {
      switch (param) {
        case "primaryColor":
          return t("colors.primary");
        case "primaryBgColor":
          return t("colors.primary-bg");
        case "secondaryColor":
          return t("colors.secondary");
        case "sidebarColor":
          return t("colors.sidebar");
        case "sidebarBgColor":
          return t("colors.sidebar-bg");
        case "sidebarSidebarCaptionColor":
          return t("colors.sidebar-caption");
        case "sidebarSidebarCaptionBgColor":
          return t("colors.sidebar-caption-bg");
        default:
          return;
      }
    },
    [t]
  );

  const getValueFromEvent = useCallback((color: Color): string => {
    return "#" + color.toHex();
  }, []);

  return (
    <>
      {_.map(initialValues, (_color, param): React.ReactNode => {
        const typedParam: keyof Colors = param as keyof Colors;

        return (
          <Tooltip key={typedParam} title={getColorPickerLabel(typedParam)}>
            <div>
              <Form.Item
                name={typedParam}
                getValueFromEvent={getValueFromEvent}
              >
                <ColorPicker />
              </Form.Item>
            </div>
          </Tooltip>
        );
      })}
    </>
  );
};
