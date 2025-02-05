import { Form, Input, Divider, DatePicker, Flex, Space } from "antd";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";

import type { FormListFieldData } from "antd";
import type { FormQualification } from "../../../../store/form/interface";
import type { Profile } from "../../../../store/profile/interface";

export const QualificationsList = (): React.ReactNode => {
  return (
    <Form.List name={"qualifications" satisfies keyof Profile}>
      {(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
        <>
          <Divider orientation={"left"}>Additional Qualifications</Divider>

          {fields.map(
            ({ key, name, ...restField }): React.ReactNode => (
              <Flex key={key} gap={8}>
                <Flex vertical flex={1}>
                  <Flex gap={8}>
                    <Flex flex={1}>
                      <Space.Compact block>
                        <Form.Item
                          {...restField}
                          name={[
                            name,
                            "type" satisfies keyof FormQualification,
                          ]}
                          style={{ width: "100%", marginBottom: 8 }}
                        >
                          <Input placeholder={"Type"} />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[
                            name,
                            "name" satisfies keyof FormQualification,
                          ]}
                          style={{ width: "100%", marginBottom: 8 }}
                        >
                          <Input placeholder={"Name"} />
                        </Form.Item>
                      </Space.Compact>
                    </Flex>

                    <Flex flex={1} style={{ width: "100%", maxWidth: 120 }}>
                      <Form.Item
                        {...restField}
                        name={[
                          name,
                          "issueDate" satisfies keyof FormQualification,
                        ]}
                        style={{ width: "100%", marginBottom: 8 }}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder={"Issue date"}
                        />
                      </Form.Item>
                    </Flex>
                  </Flex>

                  <Form.Item
                    {...restField}
                    name={[
                      name,
                      "description" satisfies keyof FormQualification,
                    ]}
                  >
                    <Input.TextArea placeholder={"Description"} />
                  </Form.Item>
                </Flex>

                <DeleteListItem name={name} remove={remove} />
              </Flex>
            )
          )}

          <AddListItem add={add} text={"Add qualification"} />
        </>
      )}
    </Form.List>
  );
};
