import { Button, Checkbox, Form, Space } from "antd";
import { DisplayLimitFormItem } from "../DisplayLimitFormItem/DisplayLimitFormItem";
import { DatePickerField } from "../DatePickerField/DatePickerField";
import { Trans } from "react-i18next";

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import type { DateRangeFormItemProps } from "./DateRangeFormItem.interface";
import type { CheckboxChangeEvent } from "antd";
import type { FormDate } from "../../../store/profile/interface";

import styles from "./DateRangeFormItem.module.scss";

export const DateRangeFormItem = ({
	name,
	subname,
	restField,
}: DateRangeFormItemProps): React.ReactNode => {
	const [present, setPresent] = useState<boolean>(false);

	const { t } = useTranslation();

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
					present={present}
					placeholder={[
						t("date-range-form-item.start-date"),
						t("date-range-form-item.end-date"),
					]}
				/>
			</Form.Item>

			<DisplayLimitFormItem
				restField={restField}
				name={[name, subname, "displayLimit" satisfies keyof FormDate]}
			/>

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
		</Space.Compact>
	);
};
