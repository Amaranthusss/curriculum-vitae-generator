import { Form, Input, Divider, Flex } from "antd";
import { DisplayLimitFormItem } from "../../../common/DisplayLimitFormItem/DisplayLimitFormItem";
import { DatePickerFormItem } from "../../../common/DatePickerFormItem/DatePickerFormItem";
import { SortableContext } from "@dnd-kit/sortable";
import { DeleteListItem } from "../../../common/DeleteListItem/DeleteListItem";
import { SortableItem } from "../../../common/SortableItem/SortableItem";
import { AddListItem } from "../../../common/AddListItem/AddListItem";
import { DragHandle } from "../../../common/DragHandle/DragHandle";
import { Trans } from "react-i18next";

import { useTranslation } from "react-i18next";

import { useProfileStore } from "../../../../store/profile/useProfileStore";

import { assignOrderIndexes } from "../../../../utils/assignOrderIndexes";
import { arrayMove } from "@dnd-kit/sortable";
import _ from "lodash";

import type { EducationField, GeneralSettings } from "../../../../store/profile/interface";
import type { FormInstance, FormListFieldData } from "antd";
import type { DragEndEvent } from "@dnd-kit/core";
import type { Profile } from "../../../../store/profile/interface";

import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { DndContext } from "@dnd-kit/core";

export const EducationList = (): React.ReactNode => {
	const generalSettings: GeneralSettings = useProfileStore(({ generalSettings }) => generalSettings);
	const form: FormInstance<Profile> = Form.useFormInstance();
	const { t } = useTranslation();

	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (!active || !over) {
			return;
		}
		if (active.id !== over.id) {
			const education: EducationField[] = form.getFieldValue("education") || [];
			const activeIndex: number = _.findIndex(education, (i) => i.orderIndex === active.id);
			const overIndex: number = _.findIndex(education, (i) => i.orderIndex === over.id);
			const orderedList: EducationField[] = assignOrderIndexes(arrayMove(education, activeIndex, overIndex));

			form.setFieldsValue({ education: orderedList });
			useProfileStore.setState({ education: orderedList });
		}
	};

	return (
		<>
			<Flex>
				<Flex flex={1}>
					<Divider orientation={"left"}>
						<Trans i18nKey={"education.caption"} />
					</Divider>
				</Flex>

				<Flex style={{ minWidth: 132 }}>
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

			<DndContext
				id={'education-list-drag-sorting-handler'}
				modifiers={[restrictToVerticalAxis]}
				onDragEnd={onDragEnd}
			>
				<Form.List name={"education" satisfies keyof Profile}>
					{(fields: FormListFieldData[], { add, remove }): React.ReactNode => {
						const educationItems: EducationField[] = assignOrderIndexes<EducationField>(form.getFieldValue("education"));

						return (
							<SortableContext
								strategy={verticalListSortingStrategy}
								items={_.map(educationItems, (item, index) => item.orderIndex ?? index)}
							>
								{fields.map(
									({ key, name, ...restField }): React.ReactNode => {
										const orderIndex: number = form.getFieldValue(["education", name, "orderIndex"]) ?? key;

										return (
											<SortableItem key={key} itemKey={orderIndex}>
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

													<DeleteListItem name={name} remove={remove} />
													<DragHandle />
												</Flex>
											</SortableItem>
										);
									}
								)}

								<AddListItem add={add} text={t("education.add")} />
							</SortableContext>
						)
					}}
				</Form.List>
			</DndContext>
		</>
	);
};
