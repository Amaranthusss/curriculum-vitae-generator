import { LabelWithFlag } from "./LabelWithFlag/LabelWithFlag";
import { Select } from "antd";

import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { SelectOption } from "../../../types/antd";

import { Language } from "../../../constants/Language";

import styles from "./LanguageSelector.module.scss";

export const LanguageSelector = (): React.ReactNode => {
  const { i18n } = useTranslation();

  const options = useMemo((): SelectOption[] => {
    return [
      {
        label: (
          <LabelWithFlag
            language={Language.British}
            text={"English (British)"}
          />
        ),
        value: Language.British,
      },
      {
        label: <LabelWithFlag language={Language.Polish} text={"Polski"} />,
        value: Language.Polish,
      },
      {
        label: <LabelWithFlag language={Language.German} text={"Deutsch"} />,
        value: Language.German,
        disabled: true,
      },
    ];
  }, []);

  const onChange = useCallback(
    (language: Language): void => {
      i18n.changeLanguage(language);
    },
    [i18n]
  );

  return (
    <Select<Language>
      options={options}
      onChange={onChange}
      defaultValue={i18n.language as Language}
      className={styles.selector}
    />
  );
};
