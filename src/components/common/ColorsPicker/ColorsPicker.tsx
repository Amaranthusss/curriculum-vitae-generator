import { Pickers } from "./Pickers/Pickers";
import { Form } from "antd";

import { useCallback, useEffect, useMemo } from "react";

import { useColorsStore } from "../../../store/colors/useColorsStore";

import type { GetColors } from "../../../store/colors/interface";
import type { SetColors } from "../../../store/colors/interface";
import type { Colors } from "../../../store/colors/interface";

export const ColorsPicker = (): React.ReactNode => {
	const setColors: SetColors = useColorsStore(({ setColors }) => setColors);
	const getColors: GetColors = useColorsStore(({ getColors }) => getColors);
	const signalProfile = useColorsStore(({ signalProfile }) => signalProfile);
	const [form] = Form.useForm();

	const onValuesChange = useCallback(
		(changedValues: Partial<Colors>): void => {
			setColors(changedValues);
		},
		[setColors]
	);

	const initialValues = useMemo((): Colors => {
		return getColors();
	}, [getColors]);

	useEffect((): void => {
		if (signalProfile == null) return;
		form.setFieldsValue(getColors());
	}, [getColors, signalProfile, form]);

	return (
		<Form<Colors>
			form={form}
			name={"colorsForm"}
			onValuesChange={onValuesChange}
			initialValues={initialValues}
		>
			<Pickers initialValues={initialValues} />
		</Form>
	);
};
