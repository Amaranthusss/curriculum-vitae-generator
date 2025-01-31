import { MinusCircleOutlined } from "@ant-design/icons";

import { useCallback } from "react";

import type { DeleteListItemProps } from "./DeleteListItem.interface";

export const DeleteListItem = ({
  name,
  remove,
  className,
}: DeleteListItemProps): React.ReactNode => {
  const removeHandler = useCallback((): void => {
    remove(name);
  }, [remove, name]);

  return <MinusCircleOutlined className={className} onClick={removeHandler} />;
};
