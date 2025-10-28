import { Button, Checkbox, Form, Space } from "antd";
import { DisplayLimitFormItem } from "../DisplayLimitFormItem/DisplayLimitFormItem";
import { DatePickerField } from "../DatePickerField/DatePickerField";
import { Trans } from "react-i18next";

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import type { DatePickerProps, FormInstance } from "antd";
import type { DatePickerFormItemProps } from "./DatePickerFormItem.interface";
import type { FormDate, Profile } from "../../../store/profile/interface";

import { DisplayLimit } from "../../../constants/DisplayLimit";

import styles from "./DatePickerFormItem.module.scss";

export const DatePickerFormItem = ({
	name,
	subname,
	restField,
	parentName,
	placeholders,
	disableRange,
	displayLimitDefault,
}: DatePickerFormItemProps): React.ReactNode => {
	const form: FormInstance<Profile> = Form.useFormInstance();
	const present = Form.useWatch([...parentName, name, subname, "present"], form);

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

	const [picker, setPicker] = useState<DatePickerProps['picker']>(
		displayLimitDefaultToPicker(displayLimitDefault)
	);

	const { t } = useTranslation();

	const onDisplayLimitChange = useCallback((value: DisplayLimit): void => {
		setPicker(displayLimitDefaultToPicker(value));
	}, [displayLimitDefaultToPicker]);

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
				<Button className={styles.present}>
					<Form.Item
						{...restField}
						name={[name, subname, "present" satisfies keyof FormDate]}
						valuePropName={"checked"}
					>
						<Checkbox>
							<Trans i18nKey={"date-range-form-item.present"} />
						</Checkbox>
					</Form.Item>
				</Button>
			)}
		</Space.Compact>
	);
};
