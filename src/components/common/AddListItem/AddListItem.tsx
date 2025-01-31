import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useCallback } from "react";

import type { AddListItemProps } from "./AddListItem.interface";

export const AddListItem = ({
  add,
  text,
}: AddListItemProps): React.ReactNode => {
  const addHandler = useCallback((): void => {
    add();
  }, [add]);

  return (
    <Form.Item>
      <Button
        type={"dashed"}
        onClick={addHandler}
        block
        icon={<PlusOutlined />}
      >
        {text}
      </Button>
    </Form.Item>
  );
};
