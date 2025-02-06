import { Form, Input, Divider, DatePicker, Flex } from "antd";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";
import { Trans } from "react-i18next";

import { useTranslation } from "react-i18next";

import type { FormListFieldData } from "antd";
import type { PublicationField } from "../../../../store/profile/interface";
import type { Profile } from "../../../../store/profile/interface";
import type { Dayjs } from "dayjs";

export const PublicationsList = (): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Form.List name={"publications" satisfies keyof Profile}>
      {(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
        <>
          <Divider orientation={"left"}>
            <Trans i18nKey={"publications.caption"} />
          </Divider>

          {fields.map(
            ({ key, name, ...restField }): React.ReactNode => (
              <Flex key={key} gap={8}>
                <Flex vertical flex={1}>
                  <Flex gap={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "title" satisfies keyof PublicationField]}
                      style={{ width: "100%", marginBottom: 8 }}
                    >
                      <Input placeholder={t("publications.title")} />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[
                        name,
                        "publicationYear" satisfies keyof PublicationField,
                      ]}
                      style={{ width: "100%", marginBottom: 8, maxWidth: 80 }}
                    >
                      <DatePicker
                        picker={"year"}
                        style={{ width: "100%" }}
                        placeholder={t("publications.year")}
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
                          "publisher" satisfies keyof PublicationField,
                        ]}
                        style={{ width: "100%" }}
                      >
                        <Input placeholder={t("publications.publisher")} />
                      </Form.Item>
                    </Flex>

                    <Flex flex={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "code" satisfies keyof PublicationField]}
                        style={{ width: "100%" }}
                      >
                        <Input placeholder={t("publications.code")} />
                      </Form.Item>
                    </Flex>
                  </Flex>
                </Flex>

                <DeleteListItem name={name} remove={remove} />
              </Flex>
            )
          )}

          <AddListItem add={add} text={t("publications.add")} />
        </>
      )}
    </Form.List>
  );
};
