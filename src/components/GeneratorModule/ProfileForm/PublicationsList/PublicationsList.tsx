import { Form, Input, Divider, Flex } from "antd";
import { DragAndDropProfileList } from "../../../common/DragAndDropProfileList";
import { DisplayLimitFormItem } from "../../../common/DisplayLimitFormItem/DisplayLimitFormItem";
import { DatePickerFormItem } from "../../../common/DatePickerFormItem/DatePickerFormItem";
import { FormListItemToolbar } from "../../../common/FormListItemToolbar/FormListItemToolbar";
import { AddListItem } from "../../../common/AddListItem/AddListItem";
import { Trans } from "react-i18next";

import { useTranslation } from "react-i18next";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import type { GeneralSettings, PublicationField } from "../../../../store/profile/interface";
import type { FormInstance, FormListFieldData } from "antd";
import type { Profile } from "../../../../store/profile/interface";

export const PublicationsList = (): React.ReactNode => {
	const generalSettings: GeneralSettings = useProfileStore(({ generalSettings }) => generalSettings);
	const form: FormInstance<Profile> = Form.useFormInstance();
	const { t } = useTranslation();

	return (
		<>
			<Flex>
				<Flex flex={1}>
					<Divider orientation={"left"}>
						<Trans i18nKey={"publications.caption"} />
					</Divider>
				</Flex>

				<Flex style={{ minWidth: 200 }}>
					<Divider orientation={"center"} >
						<DisplayLimitFormItem
							style={{ margin: 0 }}
							name={[
								"generalSettings" satisfies keyof Profile,
								"publications" satisfies keyof GeneralSettings,
								"dateDisplayLimit" satisfies keyof GeneralSettings['publications'],
							]}
						/>
					</Divider>
				</Flex>
			</Flex>

			<DragAndDropProfileList form={form} listName={'publications'}>
				<Form.List name={"publications" satisfies keyof Profile}>
					{(fields: FormListFieldData[], { add, remove }): React.ReactNode => (
						<DragAndDropProfileList.Context>
							{fields.map(
								({ key, name, ...restField }): React.ReactNode => (
									<DragAndDropProfileList.Item key={key} name={name} >
										<Flex gap={8}>
											<Flex vertical flex={1}>
												<Flex gap={8}>
													<Form.Item
														{...restField}
														name={[name, "title" satisfies keyof PublicationField]}
														style={{ width: "100%", marginBottom: 8 }}
													>
														<Input placeholder={t("publications.title")} />
													</Form.Item>

													<DatePickerFormItem
														name={name}
														disableRange
														restField={restField}
														placeholders={[t("publications.publish-date"), '']}
														subname={"date" satisfies keyof PublicationField}
														parentName={["publications" satisfies keyof Profile]}
														displayLimitDefault={generalSettings.publications.dateDisplayLimit}
													/>
												</Flex>

												<Flex gap={8}>
													<Flex flex={2}>
														<Form.Item
															{...restField}
															name={[name, "publisher" satisfies keyof PublicationField]}
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

											<FormListItemToolbar name={name} remove={remove} />
										</Flex>
									</DragAndDropProfileList.Item>
								)
							)}

							<AddListItem add={add} text={t("publications.add")} />
						</DragAndDropProfileList.Context>
					)}
				</Form.List>
			</DragAndDropProfileList>
		</>
	);
};
