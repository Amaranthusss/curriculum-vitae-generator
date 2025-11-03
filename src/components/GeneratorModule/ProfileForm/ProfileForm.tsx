import { Divider, Flex, Form, Input, Select, Slider, Space, Switch } from "antd";
import { QualificationsList } from "./QualificationsList/QualificationsList";
import { AlignmentSelector } from "../../common/AlignmentSelector/AlignmentSelector";
import { PublicationsList } from "./PublicationsList/PublicationsList";
import { ExperienceList } from "./ExperienceList/ExperienceList";
import { ReferencesList } from "./ReferencesList/ReferencesList";
import { LanguagesList } from "./LanguagesList/LanguagesList";
import { EducationList } from "./EducationList/EducationList";
import { UploadImage } from "../../common/UploadImage/UploadImage";
import { Trans } from "react-i18next";

import { useProfilePictureListener } from "./_hooks/useProfilePictureListener";
import { useManualRenderListener } from "./_hooks/useManualRenderListener";
import { useTranslation } from "react-i18next";
import { useController } from "../../../hooks/useController";
import { useCallback } from "react";
import { useMemo } from "react";

import { useFormStore } from "../../../store/form/useFormStore";
import { useAppStore } from "../../../store/app/useAppStore";

import { assignOrderIndexes } from "../../../utils/assignOrderIndexes";
import { getBase64 } from "../../../utils/getBase64";
import _ from "lodash";

import type { UploadImageController } from "../../common/UploadImage/UploadImage.interface";
import type { GetInitialFormValues } from "../../../store/form/interface";
import type { UpdateValues } from "../../../store/form/interface";
import type { UploadProps } from "antd";
import type { RenderMode } from "../../../store/app/interface";
import type { DateDisplayStyle, Profile } from "../../../store/profile/interface";

export const ProfileForm = (): React.ReactNode => {
	const { controller: imageController, setController: setImageController } = useController<UploadImageController>();
	const renderMode: RenderMode = useAppStore(({ renderMode }) => renderMode);
	const [form] = Form.useForm();
	const { t } = useTranslation();

	const getInitialFormValues: GetInitialFormValues = useFormStore(({ getInitialFormValues }) => getInitialFormValues);
	const updateValues: UpdateValues = useFormStore(({ updateValues }) => updateValues);

	const onValuesChange = useCallback(
		(changedValues: Partial<Profile>, values: Profile): void => {

			const isGeneralSettingsChange: boolean = !_.isEmpty(changedValues.generalSettings);

			if (isGeneralSettingsChange) {
				return updateValues({ generalSettings: values.generalSettings });
			}

			const isLanguagesListChange: boolean = !_.isEmpty(
				changedValues.languages
			);

			if (isLanguagesListChange) {
				return updateValues({ languages: values.languages });
			}

			const isEducationChange: boolean = !_.isEmpty(changedValues.education);

			if (isEducationChange) {
				return updateValues({ education: assignOrderIndexes(values.education) });
			}

			const isExperienceChange: boolean = !_.isEmpty(changedValues.experience);

			if (isExperienceChange) {
				return updateValues({ experience: values.experience });
			}

			const isLinksChange: boolean = !_.isEmpty(changedValues.references);

			if (isLinksChange) {
				return updateValues({ references: values.references });
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

	const updateAllValues = useCallback((_: Partial<Profile>, profile: Profile): void => {
		updateValues(profile);
	}, [updateValues])

	const onValuesChangeBasedOnRenderMode = useMemo(() => {
		switch (renderMode) {
			case 'onChange':
				return onValuesChange;
			case 'debounced':
				return _.debounce(updateAllValues, 1000);
			case 'manual':
				return;
		}
	}, [onValuesChange, updateAllValues, renderMode]);

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

	useProfilePictureListener(form, imageController);
	useManualRenderListener(form, updateValues);

	return (
		<Form<Profile>
			form={form}
			name={"profileForm"}
			onValuesChange={onValuesChangeBasedOnRenderMode}
			initialValues={initialValues}
			style={{ paddingRight: 12 }}
		>
			<Divider orientation={"left"}>
				<Trans i18nKey={"cv-settings.caption"} />
			</Divider>

			<Flex gap={24}>
				<Form.Item
					label={t("cv-settings.date-range-display-type")}
					name={"dateDisplayStyle" satisfies keyof Profile}
				>
					<Select
						style={{ minWidth: 185 }}
						options={[
							{ value: 'inline' satisfies DateDisplayStyle, label: t("cv-settings.date-range-inline") },
							{ value: 'from-to' satisfies DateDisplayStyle, label: t("cv-settings.date-range-from-to") },
							{ value: 'vertical' satisfies DateDisplayStyle, label: t("cv-settings.date-range-vertical") },
							{ value: 'seperated-vertical' satisfies DateDisplayStyle, label: t("cv-settings.date-range-seperated-vertical") },
						]}
					/>
				</Form.Item>

				<Form.Item
					label={t("cv-settings.date-column-widths")}
					name={"dateColumnWidths" satisfies keyof Profile}
				>
					<Slider style={{ width: 90 }} min={25} max={90} />
				</Form.Item>
			</Flex>

			<Divider orientation={"left"}>
				<Trans i18nKey={"personal-data.caption"} />
			</Divider>

			<Flex gap={24}>
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

			<Divider orientation={"left"}>
				<Trans i18nKey={'personal-data.contact-data'} />
			</Divider>

			<Form.Item
				label={t("personal-data.email")}
				name={"email" satisfies keyof Profile}
			>
				<Input placeholder={t("personal-data.email")} />
			</Form.Item>

			<Form.Item
				label={t("personal-data.mobile")}
				name={"mobile" satisfies keyof Profile}
			>
				<Input placeholder={t("personal-data.mobile")} />
			</Form.Item>

			<Divider orientation={"left"}>
				<Trans i18nKey={'personal-data.about-me'} />
			</Divider>

			<Form.Item name={"aboutMe" satisfies keyof Profile} >
				<Input.TextArea
					rows={4}
					placeholder={t("personal-data.about-me-placeholder")}
				/>
			</Form.Item>

			<Flex gap={24}>
				<Form.Item
					label={t("personal-data.about-me-position")}
					name={"isAboutMeAtPage" satisfies keyof Profile}
				>
					<Switch
						checkedChildren={t("personal-data.about-me-page-position")}
						unCheckedChildren={t("personal-data.about-me-sidebar-position")}
					/>
				</Form.Item>

				<Form.Item
					name={"aboutMeAlignment" satisfies keyof Profile}
					label={t('alignment.caption')}
				>
					<AlignmentSelector />
				</Form.Item>
			</Flex>

			<Divider orientation={"left"}>
				<Trans i18nKey={'interests.caption'} />
			</Divider>

			<Form.Item name={"interests" satisfies keyof Profile}>
				<Input.TextArea
					rows={4}
					placeholder={t("interests.placeholder")}
				/>
			</Form.Item>

			<Form.Item
				name={"interestsAlignment" satisfies keyof Profile}
				label={t('alignment.caption')}
			>
				<AlignmentSelector />
			</Form.Item>

			<Divider orientation={"left"}>
				<Trans i18nKey={'footer.caption'} />
			</Divider>

			<Form.Item name={"footer" satisfies keyof Profile} 	>
				<Input.TextArea
					rows={4}
					placeholder={t("footer.placeholder")}
				/>
			</Form.Item>

			<Flex gap={24}>
				<Form.Item
					name={"footerAlignment" satisfies keyof Profile}
					label={t('alignment.caption')}
				>
					<AlignmentSelector />
				</Form.Item>

				<Form.Item
					label={t("footer.top-margin")}
					name={"footerTopMargin" satisfies keyof Profile}
				>
					<Slider style={{ width: 200 }} min={0} max={600} />
				</Form.Item>
			</Flex>

			<LanguagesList />
			<EducationList />
			<ExperienceList />
			<QualificationsList />
			<PublicationsList />
			<ReferencesList />
		</Form>
	);
};
