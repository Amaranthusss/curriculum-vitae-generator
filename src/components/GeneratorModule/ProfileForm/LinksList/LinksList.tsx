import { Form, Input, Divider, Flex, Select } from "antd";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";

import { useMemo } from "react";

import _ from "lodash";

import type { FormListFieldData } from "antd";
import type { SelectOption } from "./LinksList.interface";
import type { Profile } from "../../../../store/profile/interface";

import { iconsAssetsFolderPath } from "./LinksList.config";
import { predefiniedLinkIcons } from "./LinksList.config";

import styles from "./LinksList.module.scss";

export const LinksList = (): React.ReactNode => {
  const predefiniedIcons = useMemo((): SelectOption[] => {
    return _.chain(predefiniedLinkIcons)
      .map((filePath: string): SelectOption => {
        const [type, name] = _.split(filePath, "/");
        const src = "./" + iconsAssetsFolderPath + filePath;

        return {
          label: (
            <div className={styles.label}>
              <img src={src} alt={type + " " + name} />
              <span>
                ({type})&nbsp;{name}
              </span>
            </div>
          ),
          value: src,
          type,
        };
      })
      .sortBy("type")
      .value();
  }, []);

  return (
    <Form.List name={"links" satisfies keyof Profile}>
      {(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
        <>
          <Divider orientation={"left"}>References / Links</Divider>

          {fields.map(
            ({ key, name, ...restField }): React.ReactNode => (
              <Flex key={key} gap={8}>
                <Flex flex={1} gap={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "label"]}
                    style={{ flex: 1 }}
                  >
                    <Input placeholder={"Label"} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "link"]}
                    style={{ flex: 1 }}
                  >
                    <Input placeholder={"Website address"} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "icon"]}
                    style={{ flex: 1 }}
                  >
                    <Select
                      placeholder={"Icon"}
                      options={predefiniedIcons}
                      popupMatchSelectWidth={false}
                    />
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
