import { LabelWithFlag } from "./LabelWithFlag/LabelWithFlag";
import { Select } from "antd";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { toLanguageDayjs } from "../../../utils/toLanguageDayjs";
import dayjs from "dayjs";

import type { SelectOption } from "../../../types/antd";

import { Language } from "../../../constants/Language";

import styles from "./LanguageSelector.module.scss";

export const LanguageSelector = (): React.ReactNode => {
	const { i18n } = useTranslation();
	const [value, setValue] = useState<Language>(i18n.language as Language);

	const options = useMemo((): SelectOption[] => {
		return [
			{
				label: <LabelWithFlag language={Language.British} text={"English (British)"} />,
				value: Language.British,
			},
			{
				label: <LabelWithFlag language={Language.Polish} text={"Polski"} />,
				value: Language.Polish,
			},
			{
				label: <LabelWithFlag language={Language.German} text={"Deutsch"} />,
				value: Language.German,
			},
		];
	}, []);

	const onChange = useCallback(
		(language: Language): void => {
			i18n.changeLanguage(language);
			dayjs.locale(toLanguageDayjs(language));
			setValue(language);
		}, [i18n]);

	useEffect((): void => {
		const language: Language = i18n.language as Language;

		setValue(language);
		dayjs.locale(toLanguageDayjs(language));
	}, [i18n.language]);

	return (
		<Select<Language>
			value={value}
			options={options}
			onChange={onChange}
			className={styles.selector}
		/>
	);
};
