import { Divider, Flex, Form, Input, Space, UploadProps } from "antd";
import { QualificationsList } from "./QualificationsList/QualificationsList";
import { PublicationsList } from "./PublicationsList/PublicationsList";
import { ExperienceList } from "./ExperienceList/ExperienceList";
import { ReferencesList } from "./ReferencesList/ReferencesList";
import { LanguagesList } from "./LanguagesList/LanguagesList";
import { EducationList } from "./EducationList/EducationList";
import { UploadImage } from "../../common/UploadImage/UploadImage";
import { Trans } from "react-i18next";

import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import { useProfileStore } from "../../../store/profile/useProfileStore";
import { useController } from "../../../hooks/useController";
import { useFormStore } from "../../../store/form/useFormStore";

import { getBase64 } from "../../../utils/getBase64";
import _ from "lodash";

import type { UploadImageController } from "../../common/UploadImage/UploadImage.interface";
import type { GetInitialFormValues } from "../../../store/form/interface";
import type { UpdateValues } from "../../../store/form/interface";
import type { Profile } from "../../../store/profile/interface";

export const ProfileForm = (): React.ReactNode => {
	const { controller: imageController, setController: setImageController } = useController<UploadImageController>();
	const signalProfile = useFormStore(({ signalProfile }) => signalProfile);
	const [form] = Form.useForm();
	const { t } = useTranslation();

	const getInitialFormValues: GetInitialFormValues = useFormStore(
		({ getInitialFormValues }) => getInitialFormValues
	);

	const updateValues: UpdateValues = useFormStore(
		({ updateValues }) => updateValues
	);

	const onValuesChange = useCallback(
		(changedValues: Partial<Profile>, values: Profile): void => {
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

			const isLinksChange: boolean = !_.isEmpty(changedValues.links);

			if (isLinksChange) {
				return updateValues({ links: values.links });
			}

			const isQualificationsChange: boolean = !_.isEmpty(
				changedValues.qualifications
			);

			if (isQualificationsChange) {
				return updateValues({ qualifications: values.qualifications });
			}

			const isPublicationsChange: boolean = !_.isEmpty(
				changedValues.publications
			);

			if (isPublicationsChange) {
				return updateValues({ publications: values.publications });
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

	const initialValues = useMemo((): Profile => {
		return getInitialFormValues();
	}, [getInitialFormValues]);

	useEffect((): void => {
		if (signalProfile == null) return;

		const profile: Profile = useProfileStore.getState().getProfile();

		if (profile.picture && _.startsWith(profile.picture, 'data:')) {
			imageController.current?.setFileList([
				{
					uid: '-1',
					name: 'profile-picture.png',
					status: 'done',
					url: profile.picture
				},
			]);
		} else {
			imageController.current?.setFileList([]);
		}

		form.setFieldsValue(profile);
	}, [imageController, signalProfile, form]);

	return (
		<Form<Profile>
			form={form}
			name={"profileForm"}
			onValuesChange={onValuesChange}
			initialValues={initialValues}
			style={{ paddingRight: 12 }}
		>
			<Divider orientation={"left"}>
				<Trans i18nKey={"personal-data.caption"} />
			</Divider>

			<Flex gap={16}>
				<UploadImage setController={setImageController} onChange={onUploadImage} />

				<Flex vertical>
					<Form.Item label={t("personal-data.full-name")}>
						<Space.Compact>
							<Form.Item
								noStyle
								label={t("personal-data.name")}
								name={"name" satisfies keyof Profile}
							>
								<Input placeholder={t("personal-data.name")} />
							</Form.Item>

							<Form.Item
								noStyle
								label={t("personal-data.surname")}
								name={"surname" satisfies keyof Profile}
							>
								<Input placeholder={t("personal-data.surname")} />
							</Form.Item>
						</Space.Compact>
					</Form.Item>

					<Form.Item
						label={t("personal-data.country")}
						name={"country" satisfies keyof Profile}
					>
						<Input placeholder={t("personal-data.country")} />
					</Form.Item>
				</Flex>
			</Flex>

			<Divider />

			<Form.Item
				label={t("personal-data.about-me")}
				name={"aboutMe" satisfies keyof Profile}
			>
				<Input.TextArea placeholder={t("personal-data.about-me-placeholder")} />
			</Form.Item>

			<Form.Item
				label={t("personal-data.email")}
				name={"email" satisfies keyof Profile}
			>
				<Input placeholder={t("personal-data.email")} />
			</Form.Item>

			<LanguagesList />
			<EducationList />
			<ExperienceList />
			<QualificationsList />
			<PublicationsList />
			<ReferencesList />
		</Form>
	);
};
