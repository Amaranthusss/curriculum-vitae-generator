import { Pickers } from "./Pickers/Pickers";
import { Form } from "antd";

import { useCallback, useMemo } from "react";

import { useColorsStore } from "../../../store/colors/useColorsStore";

import type { GetInitialColors } from "../../../store/colors/interface";
import type { SetColors } from "../../../store/colors/interface";
import type { Colors } from "../../../store/colors/interface";

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

  return (
    <Form<Colors>
      name={"colorsForm"}
      onValuesChange={onValuesChange}
      initialValues={initialValues}
    >
      <Pickers initialValues={initialValues} />
    </Form>
  );
};
