import { ColorPicker, Form, Tooltip } from "antd";

import { useCallback, useMemo } from "react";

import { useColorsStore } from "../../../store/colors/useColorsStore";

import type { GetInitialColors } from "../../../store/colors/interface";
import type { SetColors } from "../../../store/colors/interface";
import type { Colors } from "../../../store/colors/interface";
import type { Color } from "antd/es/color-picker";
import _ from "lodash";

export const ColorsPicker = (): React.ReactNode => {
  const setColors: SetColors = useColorsStore(({ setColors }) => setColors);

  const getInitialColors: GetInitialColors = useColorsStore(
    ({ getInitialColors }) => getInitialColors
  );

  const onValuesChange = useCallback(
    (changedValues: Partial<Colors>): void => {
      setColors(changedValues);
    },
    [setColors]
  );

  const initialValues = useMemo((): Colors => {
    return getInitialColors();
  }, [getInitialColors]);

  const getValueFromEvent = useCallback((color: Color): string => {
    return "#" + color.toHex();
  }, []);

  const Pickers = useCallback((): React.ReactNode[] => {
    return _.map(initialValues, (_color, param): React.ReactNode => {
      return (
        <Tooltip key={param} title={param}>
          <div>
            <Form.Item name={param} getValueFromEvent={getValueFromEvent}>
              <ColorPicker />
            </Form.Item>
          </div>
        </Tooltip>
      );
    });
  }, [initialValues, getValueFromEvent]);

  return (
    <Form<Colors>
      name={"colorsForm"}
      onValuesChange={onValuesChange}
      initialValues={initialValues}
    >
      <Pickers />
    </Form>
  );
};
