import { Form, Input, Rate, Divider, Flex } from "antd";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";

import type { FormListFieldData } from "antd";
import type { Profile } from "../../../../store/profile/interface";

export const LanguagesList = (): React.ReactNode => {
  return (
    <Form.List name={"languages" satisfies keyof Profile}>
      {(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
        <>
          <Divider orientation={"left"}>Languages</Divider>

          {fields.map(
            ({ key, name, ...restField }): React.ReactNode => (
              <Flex key={key} gap={8}>
                <Flex flex={1} gap={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "text"]}
                    style={{ flex: 1 }}
                  >
                    <Input placeholder={"Language"} />
                  </Form.Item>

                  <Form.Item {...restField} name={[name, "level"]}>
                    <Rate />
                  </Form.Item>
                </Flex>

                <DeleteListItem name={name} remove={remove} />
              </Flex>
            )
          )}

          <AddListItem add={add} text={"Add language"} />
        </>
      )}
    </Form.List>
  );
};
