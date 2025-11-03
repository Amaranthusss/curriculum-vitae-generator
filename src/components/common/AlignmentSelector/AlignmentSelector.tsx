import { Select } from "antd";

import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import type { DefaultOptionType, SelectProps } from "antd/es/select";
import type { Alignment } from "pdfmake/interfaces";

export const AlignmentSelector = ({ value, onChange }: SelectProps<Alignment>): React.ReactNode => {
	const { t } = useTranslation();

	const options = useMemo((): DefaultOptionType[] => {
		return ([
			{ value: 'left' satisfies Alignment, label: t('alignment.left') },
			{ value: 'right' satisfies Alignment, label: t('alignment.right') },
			{ value: 'center' satisfies Alignment, label: t('alignment.center') },
			{ value: 'justify' satisfies Alignment, label: t('alignment.justify') },
		]);
	}, [t])

	return (
		<Select<Alignment>
			value={value}
			options={options}
			onChange={onChange}
			style={{ maxWidth: 120 }}
		/>
	);
}