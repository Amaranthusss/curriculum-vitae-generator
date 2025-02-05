import { Form, Input, Divider, DatePicker, Flex } from "antd";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";

import type { FormListFieldData } from "antd";
import type { FormPublication } from "../../../../store/form/interface";
import type { Profile } from "../../../../store/profile/interface";
import type { Dayjs } from "dayjs";

export const PublicationsList = (): React.ReactNode => {
  return (
    <Form.List name={"publications" satisfies keyof Profile}>
      {(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
        <>
          <Divider orientation={"left"}>Research Publications</Divider>

          {fields.map(
            ({ key, name, ...restField }): React.ReactNode => (
              <Flex key={key} gap={8}>
                <Flex vertical flex={1}>
                  <Flex gap={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "title" satisfies keyof FormPublication]}
                      style={{ width: "100%", marginBottom: 8 }}
                    >
                      <Input placeholder={"Title"} />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[
                        name,
                        "publicationYear" satisfies keyof FormPublication,
                      ]}
                      style={{ width: "100%", marginBottom: 8, maxWidth: 80 }}
                    >
                      <DatePicker
                        picker={"year"}
                        style={{ width: "100%" }}
                        placeholder={"Year"}
                        disabledDate={(date: Dayjs): boolean => {
                          return (
                            date.isBefore("1900-01-01", "year") ||
                            date.isAfter(new Date().toISOString(), "year")
                          );
                        }}
                      />
                    </Form.Item>
                  </Flex>

                  <Flex gap={8}>
                    <Flex flex={2}>
                      <Form.Item
                        {...restField}
                        name={[
                          name,
                          "publisher" satisfies keyof FormPublication,
                        ]}
                        style={{ width: "100%" }}
                      >
                        <Input placeholder={"Publisher"} />
                      </Form.Item>
                    </Flex>

                    <Flex flex={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "code" satisfies keyof FormPublication]}
                        style={{ width: "100%" }}
                      >
                        <Input placeholder={"Code"} />
                      </Form.Item>
                    </Flex>
                  </Flex>
                </Flex>

                <DeleteListItem name={name} remove={remove} />
              </Flex>
            )
          )}

          <AddListItem add={add} text={"Add publication"} />
        </>
      )}
    </Form.List>
  );
};
