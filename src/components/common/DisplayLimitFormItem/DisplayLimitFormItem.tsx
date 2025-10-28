import { Form, Select } from "antd";

import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import _ from "lodash";

import type { DisplayLimitFormItemProps } from "./DisplayLimitFormItem.interface";
import type { DefaultOptionType } from "antd/es/select";

import { DisplayLimit } from "../../../constants/DisplayLimit";

import styles from './DisplayLimitFormItem.module.scss';

export const DisplayLimitFormItem = ({
	name,
	onChange,
	restField,
	className,
	defaultValue = DisplayLimit.Day,
}: DisplayLimitFormItemProps): React.ReactNode => {
	const { t } = useTranslation();

	const displayLimitOptions = useMemo((): DefaultOptionType[] => {
		return [
			{ value: DisplayLimit.Day, label: t('date-range-form-item.display-limit-day') },
			{ value: DisplayLimit.Month, label: t('date-range-form-item.display-limit-month') },
			{ value: DisplayLimit.Year, label: t('date-range-form-item.display-limit-year') },
		];
	}, [t]);

	const placeholder = useMemo((): string | undefined => {
		return _.find(displayLimitOptions, o => o.value === defaultValue)?.label?.toString();
	}, [defaultValue, displayLimitOptions]);

	const classNames = useMemo((): string => {
		const classes: string[] = [styles.displayLimitSelector];

		if (!_.isNil(className) && !_.isEmpty(className)) classes.push(className);

		return _.join(classes, ' ');
	}, [className]);

	return (
		<Form.Item {...restField} name={name} >
			<Select
				allowClear
				className={classNames}
				onChange={(v, o) => onChange?.(v, o as DefaultOptionType)}
				options={displayLimitOptions}
				placeholder={placeholder}
			/>
		</Form.Item>
	);
}