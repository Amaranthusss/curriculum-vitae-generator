import { Form, Input, Divider, Flex } from "antd";
import { DragAndDropProfileList } from "../../../common/DragAndDropProfileList";
import { DisplayLimitFormItem } from "../../../common/DisplayLimitFormItem/DisplayLimitFormItem";
import { FormListItemToolbar } from "../../../common/FormListItemToolbar/FormListItemToolbar";
import { DatePickerFormItem } from "../../../common/DatePickerFormItem/DatePickerFormItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";
import { Trans } from "react-i18next";

import { useTranslation } from "react-i18next";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import type { ExperienceField, GeneralSettings } from "../../../../store/profile/interface";
import type { FormInstance, FormListFieldData } from "antd";
import type { Profile } from "../../../../store/profile/interface";

export const ExperienceList = (): React.ReactNode => {
	const generalSettings: GeneralSettings = useProfileStore(({ generalSettings }) => generalSettings);
	const form: FormInstance<Profile> = Form.useFormInstance();
	const { t } = useTranslation();

	return (
		<>
			<Flex>
				<Flex flex={1}>
					<Divider orientation={"left"}>
						<Trans i18nKey={"experience.caption"} />
					</Divider>
				</Flex>

				<Flex style={{ minWidth: 200 }}>
					<Divider orientation={"center"} >
						<DisplayLimitFormItem
							style={{ margin: 0 }}
							name={[
								"generalSettings" satisfies keyof Profile,
								"experience" satisfies keyof GeneralSettings,
								"dateDisplayLimit" satisfies keyof GeneralSettings['experience'],
							]}
						/>
					</Divider>
				</Flex>
			</Flex>

			<DragAndDropProfileList form={form} listName={'experience'}>
				<Form.List name={"experience" satisfies keyof Profile}>
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
													subname={"date" satisfies keyof ExperienceField}
													parentName={["experience" satisfies keyof Profile]}
													displayLimitDefault={generalSettings.experience.dateDisplayLimit}
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

											<FormListItemToolbar name={name} remove={remove} />
										</Flex>
									</DragAndDropProfileList.Item>
								)
							)}

							<AddListItem add={add} text={t("experience.add")} />
						</DragAndDropProfileList.Context>
					)}
				</Form.List>
			</DragAndDropProfileList>
		</>
	);
};
