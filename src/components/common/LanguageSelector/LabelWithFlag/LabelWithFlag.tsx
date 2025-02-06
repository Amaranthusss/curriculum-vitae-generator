import { Flex } from "antd";

import { useMemo } from "react";

import type { LabelWithFlagProps } from "./LabelWithFlag.interface";

export const LabelWithFlag = ({
  language,
  text,
}: LabelWithFlagProps): React.ReactNode => {
  const src = useMemo((): string => {
    return `./assets/icons/flags/${language}.svg`;
  }, [language]);

  return (
    <Flex gap={8} align={'center'}>
      <img alt={language} src={src} height={12} />
      {text}
    </Flex>
  );
};
