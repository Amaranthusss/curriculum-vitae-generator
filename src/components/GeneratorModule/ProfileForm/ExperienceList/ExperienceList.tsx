import { Form, Input, Divider, DatePicker, Flex } from "antd";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";

import type { FormListFieldData } from "antd";
import type { FormExperience } from "../../../../store/form/interface";
import type { Profile } from "../../../../store/profile/interface";

export const ExperienceList = (): React.ReactNode => {
  return (
    <Form.List name={"experience" satisfies keyof Profile}>
      {(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
        <>
          <Divider orientation={"left"}>Professional Experience</Divider>

          {fields.map(
            ({ key, name, ...restField }): React.ReactNode => (
              <Flex key={key} gap={8}>
                <Flex vertical flex={1}>
                  <Form.Item
                    {...restField}
                    name={[name, "date" satisfies keyof FormExperience]}
                    style={{ marginBottom: 8 }}
                  >
                    <DatePicker.RangePicker style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "text" satisfies keyof FormExperience]}
                  >
                    <Input.TextArea placeholder={"Work station"} />
                  </Form.Item>
                </Flex>

                <DeleteListItem name={name} remove={remove} />
              </Flex>
            )
          )}

          <AddListItem add={add} text={"Add experience"} />
        </>
      )}
    </Form.List>
  );
};
