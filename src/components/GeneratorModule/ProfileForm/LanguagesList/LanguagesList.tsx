import { Form, Input, Rate, Divider, Flex } from "antd";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";
import { Trans } from "react-i18next";

import { useTranslation } from "react-i18next";

import type { FormListFieldData } from "antd";
import type { Profile } from "../../../../store/profile/interface";

export const LanguagesList = (): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Form.List name={"languages" satisfies keyof Profile}>
      {(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
        <>
          <Divider orientation={"left"}>
            <Trans i18nKey={"languages.caption"} />
          </Divider>

          {fields.map(
            ({ key, name, ...restField }): React.ReactNode => (
              <Flex key={key} gap={8}>
                <Flex flex={1} gap={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "text"]}
                    style={{ flex: 1 }}
                  >
                    <Input placeholder={t("languages.language")} />
                  </Form.Item>

                  <Form.Item {...restField} name={[name, "level"]}>
                    <Rate
                      count={7}
                      tooltips={[
                        "A1: " + t("languages.a1"),
                        "A2: " + t("languages.a2"),
                        "B1: " + t("languages.b1"),
                        "B2: " + t("languages.b2"),
                        "C1: " + t("languages.c1"),
                        "C2: " + t("languages.c2"),
                        t("languages.native"),
                      ]}
                    />
                  </Form.Item>
                </Flex>

                <DeleteListItem name={name} remove={remove} />
              </Flex>
            )
          )}

          <AddListItem add={add} text={t("languages.add")} />
        </>
      )}
    </Form.List>
  );
};
