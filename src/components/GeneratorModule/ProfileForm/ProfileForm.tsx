import { Divider, Flex, Form, Input, Space, UploadProps } from "antd";
import { ExperienceList } from "./ExperienceList/ExperienceList";
import { LanguagesList } from "./LanguagesList/LanguagesList";
import { EducationList } from "./EducationList/EducationList";
import { UploadImage } from "../../common/UploadImage/UploadImage";

import { useCallback } from "react";
import { useMemo } from "react";

import { useFormStore } from "../../../store/form/useFormStore";

import { getBase64 } from "../../../utils/getBase64";
import _ from "lodash";

import type { GetInitialFormValues } from "../../../store/form/interface";
import type { ProfileFormValues } from "../../../store/form/interface";
import type { UpdateValues } from "../../../store/form/interface";

export const ProfileForm = (): React.ReactNode => {
  const getInitialFormValues: GetInitialFormValues = useFormStore(
    ({ getInitialFormValues }) => getInitialFormValues
  );

  const updateValues: UpdateValues = useFormStore(
    ({ updateValues }) => updateValues
  );

  const onValuesChange = useCallback(
    (
      changedValues: Partial<ProfileFormValues>,
      values: ProfileFormValues
    ): void => {
      const isLanguagesListChange: boolean = !_.isEmpty(
        changedValues.languages
      );

      if (isLanguagesListChange) {
        return updateValues({ languages: values.languages });
      }

      const isEducationChange: boolean = !_.isEmpty(changedValues.education);

      if (isEducationChange) {
        return updateValues({ education: values.education });
      }

      const isExperienceChange: boolean = !_.isEmpty(changedValues.experience);

      if (isExperienceChange) {
        return updateValues({ experience: values.experience });
      }

      updateValues(changedValues);
    },
    [updateValues]
  );

  const convertPictureToBase64 = useCallback(
    async (
      value: ReturnType<Exclude<UploadProps["beforeUpload"], undefined>> | null
    ): Promise<void> => {
      updateValues({
        picture: value == null ? "" : await getBase64(value as File),
      });
    },
    [updateValues]
  );

  const onUploadImage = useCallback(
    (
      value: ReturnType<Exclude<UploadProps["beforeUpload"], undefined>> | null
    ): void => {
      convertPictureToBase64(value);
    },
    [convertPictureToBase64]
  );

  const initialValues = useMemo((): ProfileFormValues => {
    return getInitialFormValues();
  }, [getInitialFormValues]);

  return (
    <Form<ProfileFormValues>
      name={"profileForm"}
      onValuesChange={onValuesChange}
      initialValues={initialValues}
      style={{ paddingRight: 12 }}
    >
      <Divider orientation={"left"}>Personal Data</Divider>

      <Flex gap={16}>
        <UploadImage onChange={onUploadImage} />

        <Flex vertical>
          <Form.Item label={"Full name"}>
            <Space.Compact>
              <Form.Item
                noStyle
                label={"Name"}
                name={"name" satisfies keyof ProfileFormValues}
              >
                <Input placeholder={"Name"} />
              </Form.Item>

              <Form.Item
                noStyle
                label={"Surname"}
                name={"surname" satisfies keyof ProfileFormValues}
              >
                <Input placeholder={"Surname"} />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item
            label={"Country"}
            name={"country" satisfies keyof ProfileFormValues}
          >
            <Input placeholder={"Country"} />
          </Form.Item>
        </Flex>
      </Flex>

      <Divider />

      <Form.Item
        label={"About me"}
        name={"aboutMe" satisfies keyof ProfileFormValues}
      >
        <Input.TextArea placeholder={"Tell something about you"} />
      </Form.Item>

      <Form.Item
        label={"E-mail"}
        name={"email" satisfies keyof ProfileFormValues}
      >
        <Input placeholder={"E-mail"} />
      </Form.Item>

      <LanguagesList />
      <EducationList />
      <ExperienceList />
    </Form>
  );
};
