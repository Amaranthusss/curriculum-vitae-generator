import { Form, Input, Divider, DatePicker, Flex } from "antd";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";
import { Trans } from "react-i18next";

import { useTranslation } from "react-i18next";

import type { FormListFieldData } from "antd";
import type { EducationField } from "../../../../store/profile/interface";
import type { Profile } from "../../../../store/profile/interface";

export const EducationList = (): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Form.List name={"education" satisfies keyof Profile}>
      {(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
        <>
          <Divider orientation={"left"}>
            <Trans i18nKey={"education.caption"} />
          </Divider>

          {fields.map(
            ({ key, name, ...restField }): React.ReactNode => (
              <Flex key={key} gap={8}>
                <Flex vertical flex={1}>
                  <Form.Item
                    {...restField}
                    name={[name, "date" satisfies keyof EducationField]}
                    style={{ marginBottom: 8 }}
                  >
                    <DatePicker.RangePicker
                      style={{ width: "100%" }}
                      placeholder={[
                        t("education.start-date"),
                        t("education.end-date"),
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    style={{ marginBottom: 8 }}
                    name={[name, "title" satisfies keyof EducationField]}
                  >
                    <Input placeholder={t("education.title")} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "description" satisfies keyof EducationField]}
                  >
                    <Input.TextArea placeholder={t("education.description")} />
                  </Form.Item>
                </Flex>

                <DeleteListItem name={name} remove={remove} />
              </Flex>
            )
          )}

          <AddListItem add={add} text={t("education.add")} />
        </>
      )}
    </Form.List>
  );
};
