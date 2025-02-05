import { Form, Input, Divider, DatePicker, Flex } from "antd";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";

import type { FormListFieldData } from "antd";
import type { FormEducation } from "../../../../store/form/interface";
import type { Profile } from "../../../../store/profile/interface";

export const EducationList = (): React.ReactNode => {
  return (
    <Form.List name={"education" satisfies keyof Profile}>
      {(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
        <>
          <Divider orientation={"left"}>Education</Divider>

          {fields.map(
            ({ key, name, ...restField }): React.ReactNode => (
              <Flex key={key} gap={8}>
                <Flex vertical flex={1}>
                  <Form.Item
                    {...restField}
                    name={[name, "date" satisfies keyof FormEducation]}
                    style={{ marginBottom: 8 }}
                  >
                    <DatePicker.RangePicker style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "text" satisfies keyof FormEducation]}
                  >
                    <Input.TextArea placeholder={"Title / Description"} />
                  </Form.Item>
                </Flex>

                <DeleteListItem name={name} remove={remove} />
              </Flex>
            )
          )}

          <AddListItem add={add} text={"Add education step"} />
        </>
      )}
    </Form.List>
  );
};
