import { Form, Input, Divider, Flex } from "antd";
import { DragAndDropProfileList } from "../../../common/DragAndDropProfileList";
import { DisplayLimitFormItem } from "../../../common/DisplayLimitFormItem/DisplayLimitFormItem";
import { FormListItemToolbar } from "../../../common/FormListItemToolbar/FormListItemToolbar";
import { DatePickerFormItem } from "../../../common/DatePickerFormItem/DatePickerFormItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";
import { Trans } from "react-i18next";

import { useTranslation } from "react-i18next";

import { useProfileStore } from "../../../../store/profile/useProfileStore";
import { useAppStore } from "../../../../store/app/useAppStore";

import type { EducationField, GeneralSettings } from "../../../../store/profile/interface";
import type { FormInstance, FormListFieldData } from "antd";
import type { Profile } from "../../../../store/profile/interface";

export const EducationList = (): React.ReactNode => {
	const generalSettings: GeneralSettings = useProfileStore(({ generalSettings }) => generalSettings);
	const isCompact: boolean = useAppStore(({ isCompact }) => isCompact);
	const form: FormInstance<Profile> = Form.useFormInstance();
	const { t } = useTranslation();

	return (
		<>
			<Flex>
				<Flex flex={1}>
					<Divider orientation={"left"}>
						<Trans i18nKey={"education.caption"} />
					</Divider>
				</Flex>

				<Flex style={{ minWidth: isCompact ? 0 : 200 }}>
					<Divider orientation={"center"} >
						<DisplayLimitFormItem
							style={{ margin: 0 }}
							name={[
								"generalSettings" satisfies keyof Profile,
								"education" satisfies keyof GeneralSettings,
								"dateDisplayLimit" satisfies keyof GeneralSettings['education'],
							]}
						/>
					</Divider>
				</Flex>
			</Flex>

			<DragAndDropProfileList form={form} listName={'education'}>
				<Form.List name={"education" satisfies keyof Profile}>
					{(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
						<DragAndDropProfileList.Context>
							{fields.map(
								({ key, name, ...restField }): React.ReactNode => (
									<DragAndDropProfileList.Item key={key} name={name} >
										<Flex gap={8}>
											<Flex vertical flex={1}>
												<DatePickerFormItem
													name={name}
													restField={restField}
													subname={"date" satisfies keyof EducationField}
													parentName={["education" satisfies keyof Profile]}
													displayLimitDefault={generalSettings.education.dateDisplayLimit}
												/>

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

											<FormListItemToolbar name={name} remove={remove} />
										</Flex>
									</DragAndDropProfileList.Item>
								)
							)}

							<AddListItem add={add} text={t("education.add")} />
						</DragAndDropProfileList.Context>
					)}
				</Form.List>
			</DragAndDropProfileList>
		</>
	);
};
