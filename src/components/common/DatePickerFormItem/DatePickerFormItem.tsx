import { Button, Checkbox, Form, Space } from "antd";
import { DisplayLimitFormItem } from "../DisplayLimitFormItem/DisplayLimitFormItem";
import { DatePickerField } from "../DatePickerField/DatePickerField";
import { Trans } from "react-i18next";

import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { CheckboxChangeEvent, DatePickerProps } from "antd";
import type { DatePickerFormItemProps } from "./DatePickerFormItem.interface";
import type { FormDate } from "../../../store/profile/interface";

import { DisplayLimit } from "../../../constants/DisplayLimit";

import styles from "./DatePickerFormItem.module.scss";

export const DatePickerFormItem = ({
	name,
	subname,
	restField,
	placeholders,
	disableRange,
	displayLimitDefault,
}: DatePickerFormItemProps): React.ReactNode => {
	const defaultPresent = useMemo((): boolean => {
		if (disableRange == null) return false;
		if (disableRange) return true;
		return false;
	}, [disableRange])

	const displayLimitDefaultToPicker = useCallback((displayLimit?: DisplayLimit): DatePickerProps['picker'] => {
		switch (displayLimit) {
			case DisplayLimit.Day:
				return 'date';
			case DisplayLimit.Month:
				return 'month';
			case DisplayLimit.Year:
				return 'year';
			default:
				return 'date';
		}
	}, [])

	const [present, setPresent] = useState<boolean>(defaultPresent);
	
	const [picker, setPicker] = useState<DatePickerProps['picker']>(
		displayLimitDefaultToPicker(displayLimitDefault)
	);

	const { t } = useTranslation();

	const onDisplayLimitChange = useCallback((value: DisplayLimit): void => {
		setPicker(displayLimitDefaultToPicker(value));
	}, [displayLimitDefaultToPicker]);

	const onPresentChange = useCallback((event: CheckboxChangeEvent): void => {
		setPresent(event.target.checked);
	}, []);

	return (
		<Space.Compact className={styles.compactSpace}>
			<Form.Item
				{...restField}
				name={[name, subname, "value" satisfies keyof FormDate]}
				className={styles.datePicker}
			>
				<DatePickerField
					picker={picker}
					present={present}
					placeholder={[
						placeholders?.[0] ?? t("date-range-form-item.start-date"),
						placeholders?.[1] ?? t("date-range-form-item.end-date"),
					]}
				/>
			</Form.Item>

			<DisplayLimitFormItem
				restField={restField}
				className={styles.hideLeftBorder}
				onChange={onDisplayLimitChange}
				defaultValue={displayLimitDefault}
				name={[name, subname, "displayLimit" satisfies keyof FormDate]}
			/>

			{!disableRange && (
				<Form.Item
					{...restField}
					name={[name, subname, "present" satisfies keyof FormDate]}
					valuePropName={"checked"}
					className={styles.present}
				>
					<Button>
						<Checkbox onChange={onPresentChange}>
							<Trans i18nKey={"date-range-form-item.present"} />
						</Checkbox>
					</Button>
				</Form.Item>
			)}

		</Space.Compact>
	);
};
