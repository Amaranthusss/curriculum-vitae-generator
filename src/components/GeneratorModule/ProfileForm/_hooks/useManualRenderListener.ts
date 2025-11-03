import { useEffect } from "react";

import { useAppStore } from "../../../../store/app/useAppStore";

import type { UpdateValues } from "../../../../store/form/interface";
import type { FormInstance } from "antd";
import type { Profile } from "../../../../store/profile/interface";

export const useManualRenderListener = (
	form: FormInstance<Profile>,
	updateValues: UpdateValues
): void => {
	const signalManualRender: number | null = useAppStore(({ signalManualRender }) => signalManualRender);

	useEffect((): void => {
		if (form == null) return;
		if (signalManualRender == null) return;

		updateValues(form.getFieldsValue());
	}, [signalManualRender, form, updateValues]);
}