import { Form, Input, Divider, Flex } from "antd";
import { DateRangeFormItem } from "../../../common/DateRangeFormItem/DateRangeFormItem";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";
import { Trans } from "react-i18next";

import { useTranslation } from "react-i18next";

import type { FormListFieldData } from "antd";
import type { ExperienceField } from "../../../../store/profile/interface";
import type { Profile } from "../../../../store/profile/interface";

export const ExperienceList = (): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Form.List name={"experience" satisfies keyof Profile}>
      {(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
        <>
          <Divider orientation={"left"}>
            <Trans i18nKey={"experience.caption"} />
          </Divider>

          {fields.map(
            ({ key, name, ...restField }): React.ReactNode => (
              <Flex key={key} gap={8}>
                <Flex vertical flex={1}>
                  <DateRangeFormItem
                    name={name}
                    restField={restField}
                    subname={"date" satisfies keyof ExperienceField}
                  />

                  <Form.Item
                    {...restField}
                    style={{ marginBottom: 8 }}
                    name={[name, "workStation" satisfies keyof ExperienceField]}
                  >
                    <Input placeholder={t("experience.work-station")} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "description" satisfies keyof ExperienceField]}
                  >
                    <Input.TextArea placeholder={t("experience.description")} />
                  </Form.Item>
                </Flex>

                <DeleteListItem name={name} remove={remove} />
              </Flex>
            )
          )}

          <AddListItem add={add} text={t("experience.add")} />
        </>
      )}
    </Form.List>
  );
};
